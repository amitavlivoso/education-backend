const teacherservice=require('../services/teacher.service.js')
  
exports.createTeacher=async (req,res)=>{
try{

    const body=req.body
    const newTeacher=await teacherservice.addData(body)
    res.json({
        message:"Teacher add successfull",
        error:false,
        success:true,
        newTeacher
    })

}catch(error){
    res.status(400).json({
        message:'error in adding in Teacher ',
        error:error,
        success:false,
        error
    })
}
}
exports.getteacher=async (req,res)=>{
    try{
        const allTeacher =await teacherservice.getAllData()
        res.json({
            message:'Teacher fetched successfull',
            allTeacher
        })

    }catch(error){
       res.status(400).json({
        message:"error factiching the Teacher data",
        success:false,
        error:true
       })
    }
}
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherservice.getOneDataByCond(id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Teacher fetched successfully",
      teacher,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching teacher by ID",
      error: error.message,
      success: false,
    });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body)

    const teacher =  teacherservice.updateData(id,body);
    console.log(teacher)
    res.json({
      message: "Teacher updated successfully",
      teacher,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating teacher",
      error: error.message,
      success: false,
    });
  }
};
