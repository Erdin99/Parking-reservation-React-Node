import parkingSpotsDao from "../db/dao/parkingSpots"

const vu = async (req, res, next) => {
    const loggedUser = JSON.stringify(res.locals.user)
    const id = JSON.parse(loggedUser).id
    const validUser = await parkingSpotsDao.findValidUserById(id, req.params.id)
    
    if(!validUser) {
        return res.status(403).send('Unable to delete!')
    }

    next()
}

export const validUserForDelete = vu