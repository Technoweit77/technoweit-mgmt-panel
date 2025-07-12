import{Student}from "../Models/StudentSchema.js"
import{Course}from "../Models/CourseSchema.js"
import{Project}from "../Models/ProjectSchema.js"


let fetchCounters =async(req,res)=>{

    try {
        let studentCounter = await Student.countDocuments()
        let courseCounter = await Course.countDocuments()
        let projectCounter= await Project.countDocuments()

        res.status(200).json({
            data:{studentCounter,courseCounter,projectCounter},
        message:"Fetch counter successfully"})
    } catch (error) {
        res.status(500).json({
            message:"Error while fetching counters"
        })
    }
}
export {fetchCounters}