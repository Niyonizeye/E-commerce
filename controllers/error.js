exports.get404Page = (req,res,next)=>{
    res.status(404).render('404',{
        pageTitle:'page not found',
        path:'404',
        isAuthenticated: req.isLoggedIn
    });
}