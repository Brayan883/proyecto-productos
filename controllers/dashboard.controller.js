const ListarDashboard = async (req, res) => {
    res.render("dashboard", {
        title: "Dashboard",
    });
}

module.exports = {
    ListarDashboard
}