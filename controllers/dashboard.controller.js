const ListarDashboard = async (req, res) => {
    res.render("dashboard", {
        title: "Dashboard",
        // messages : req.flash('success')        
    });
}

module.exports = {
    ListarDashboard
}