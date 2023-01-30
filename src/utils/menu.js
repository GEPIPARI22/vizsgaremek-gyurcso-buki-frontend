module.exports = {
    //oktatok, óralátgatások, szempontsorok, dokumentumok
    menu: [
        {
            item: "Kezdőlap",
            path: "/"
        },
        {
            item: "Oktatók",
            path: "/oktatok"
        },
        {
            item: "Szempontsorok",
            path: "/szempontsorok"
        },
       
        {
            item: "Értékelések",
            path: "/ertekelesek"
        }
    ],
    //iskola, felhasznalok
    menu_admin: 
    [
        {
            item: "Iskola",
            path: "/iskolak"
        },
        {
            item: "Munkakorok",
            path: "/munkakorok"
        },
        {
            item: "Idézetek",
            path: "/contact"
        }
    ],

    menu_user: 
    [
        {
            item: "Profil",
            path: "/user"
        },
        {
            item: "Kilépés",
            path: "/logout"
        }
    ],
};