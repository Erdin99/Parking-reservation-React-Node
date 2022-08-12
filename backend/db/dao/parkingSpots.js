import db from '..'

const createParkingSpot = async (created_by_id, created_by_username, created_by_email, parking_name, parking_address, number_of_parking_spots, basic_informations, price) => {
    const createdParking = await db.raw(`INSERT INTO parking_spots (created_by_id, created_by_username, created_by_email, parking_name, 
    parking_address, number_of_parking_spots, basic_informations, price) 
    VALUES 
    (:created_by_id, :created_by_username, :created_by_email, :parking_name, :parking_address, :number_of_parking_spots, 
    :basic_informations, :price)`, 
    {created_by_id, created_by_username, created_by_email, parking_name, parking_address, number_of_parking_spots, basic_informations, price})
    return createdParking.rows[0]
}

const readAllParkings = async () => {
    const allParkings = await db.raw(`SELECT * FROM parking_spots`)
    return allParkings.rows
}

const readMyList = async (id) => {
    const myParkings = await db.raw(`SELECT * FROM parking_spots WHERE created_by_id = :id`, {id})
    return myParkings.rows
}

const readParkingDetails = async (id) => {
    const parkingDetail = await db.raw(`SELECT created_by_email, created_by_username, parking_name, parking_address, number_of_parking_spots, 
    basic_informations, price FROM parking_spots WHERE id = :id`, 
    {id})
    return parkingDetail.rows
}

const findValidUserById = async (created_by_id, id) => {
    const validUser = await db.raw(`SELECT * FROM parking_spots WHERE created_by_id = :created_by_id AND id = :id`, {created_by_id, id})
    return validUser.rows[0]
}

const updateParking = async (id, parking_name, parking_address, number_of_parking_spots, basic_informations) => {
    await db.raw(`UPDATE parking_spots SET parking_name = :parking_name, parking_address = :parking_address, 
    number_of_parking_spots = :number_of_parking_spots, basic_informations = :basic_informations 
    WHERE id = :id`, 
    {parking_name, parking_address, number_of_parking_spots, basic_informations, id})
}

const deleteParking = async (id) => {
    await db.raw(`DELETE FROM parking_spots WHERE id = :id`, {id})
}

export default {
    createParkingSpot,
    readAllParkings,
    readMyList,
    readParkingDetails,
    findValidUserById,
    updateParking,
    deleteParking
}