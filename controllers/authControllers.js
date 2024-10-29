const User=require("../models").User;
const createError=require("http-errors");
const { hash } = require("../helpers/cryptoHelper");
const Role=require("../models").Role;
const { createToken } = require("../helpers/jwtHelper");


const register=async(req,res,next)=>{
    try{
        var user=await User.findOne({
            where:{
                Email:req.validated.Email
            }
        });

        if (user != null) throw new createError.Conflict("User Already Exists!");
        else{
            var addUser=(
                await User.create(       
                    {
                        Name: req.validated.Name,
                        Email: req.validated.Email,
                        Password: hash(req.validated.Password),
                        UsedQuota:0
                    },
                    {transaction: req.transaction }
                )
            ).dataValues;
            delete addUser.Password;
            req.data = addUser;
            next();
        }
    }catch(err){
        next(err);
    }
};

const login=async(req,res,next)=>{
    try{
        hashedPassword=hash(req.validated.Password);
        var user=await User.findOne({
            attributes:["id","Name","Email","Password","RoleId","UsedQuota"],
            where: {
                Email: req.validated.Email,
                Password: hashedPassword,
            },
            include: [
                {
                  attributes: ["Name","FileQuota","TotalQuota","MaxFileSize"],
                  model: Role,
                  as: "Role",
                },
            ],
        });
        if (!user) throw new createError.NotFound("User Not Found");
        // const refreshToken = uuidv4();
        // await refreshTokenModel.create(
        //   {
        //     Token: refreshToken,
        //     UserId: user.dataValues.id,
        //   },
        //   { transaction: req.transaction }
        // );
    
        const token = createToken({
          User: user.dataValues,
        });
        // res.cookie("token", token, {
        //   maxAge: config.cookieExpire, // would expire after 20 minutes
        //   httpOnly: true, // The cookie only accessible by the web server
        //   signed: true, // Indicates if the cookie should be signed
        // });
        req.data = { User: user.dataValues, Token: token};
        next();
    }catch(err){
        next(err);
    }
};

module.exports={register,login};