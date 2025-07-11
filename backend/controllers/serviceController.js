import serviceModel from '../models/serviceModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
    try {

        const {docId} = req.body

        const docData = await serviceModel.findById(docId)
        await serviceModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true, message:'availability changed'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const serviceList = async (req, res) => {
    try {
        const services = await serviceModel.find({}).select(['-password', '-email'])

        res.json({success:true, services})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const loginService = async (req, res) => {
    try {

        const {email, password} = req.body
        const service = await serviceModel.findOne({email})
        if(!service) {
            return res.json({success:false, message:'invalid email or password'})
        }
        const isMatch = await bcrypt.compare(password, service.password)
        if(isMatch) {
            const token = jwt.sign({id:service._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false, message:'invalid email or password'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const appointmentsService = async (req, res) => {
    try {

        //const {docId} = req.body
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const appointmentComplete = async (req, res) => {
    try {

        //const {docId, appointmentId} = req.body
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:'appointment completed successfully'})
        } else {
            return res.json({success:false, message:'Mark failed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const appointmentCancel = async (req, res) => {
    try {

        //const {docId, appointmentId} = req.body
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:'appointment cancelled'})
        } else {
            return res.json({success:false, message:'cancellation failed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const serviceDashboard = async (req, res) => {
    try {
        //const {docId} = req.body;
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId})
        let earnings = 0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []

        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({success:true, dashData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const serviceProfile = async (req, res) => {
    try {

        //const {docId} = req.body
        const docId = req.docId;
        const profileData = await serviceModel.findById(docId).select('-password')
        res.json({success:true, profileData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//
const updateServiceProfile = async (req, res) => {
    try {

        //const {docId, fees, address, available} = req.body
        const docId = req.docId;
        const {fees, address, available} = req.body
        await serviceModel.findByIdAndUpdate(docId, {fees, address, available})
        res.json({success:true, message:'profile updated'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability, serviceList, loginService, appointmentsService, appointmentComplete, appointmentCancel, serviceDashboard, serviceProfile, updateServiceProfile}