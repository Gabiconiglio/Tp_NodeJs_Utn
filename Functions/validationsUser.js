function validations(req,res){
    const allowedFields=["fullName","email","password"];
      const updates=Object.keys(req.body);
      const isValidOperation=updates.every((updates=>
        allowedFields.includes(updates)
         ));
        return isValidOperation;
};

module.exports={validations};