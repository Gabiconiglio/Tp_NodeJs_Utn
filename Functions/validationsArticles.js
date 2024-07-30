function validations(req,res){
    const allowedFields=["title","type","brand","capacity","speed","casLatency","image","price","stock","rating","modular","interface","wattage","efficiency","cores","threads","clockSpeed","category","reviews","description"];
      const updates=Object.keys(req.body);
      const isValidOperation=updates.every((updates=>
        allowedFields.includes(updates)
         ));
        return isValidOperation;
};

module.exports={validations};