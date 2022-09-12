import db from '..'

const createParkingSpot = async (created_by_id, created_by_username, created_by_email, parking_name, parking_address, number_of_parking_spots, basic_informations, price, parking_image) => {
    const createdParking = await db.raw(`INSERT INTO parking_spots (created_by_id, created_by_username, created_by_email, parking_name, 
    parking_address, number_of_parking_spots, basic_informations, price, parking_image) 
    VALUES 
    (:created_by_id, :created_by_username, :created_by_email, :parking_name, :parking_address, :number_of_parking_spots, :basic_informations, :price, :parking_image)`, 
    {created_by_id, created_by_username, created_by_email, parking_name, parking_address, number_of_parking_spots, basic_informations, price, parking_image})
    return createdParking.rows[0]
}

const readAllParkings = async () => {
    const allParkings = await db.raw(`SELECT * FROM parking_spots`)
    return allParkings.rows
}

const readAllCheapestToExpensiveParkings = async () => {
    const allCheapestToExpensiveParkings = await db.raw(`SELECT * FROM parking_spots ORDER BY price`)
    return allCheapestToExpensiveParkings.rows
}

const readAllExpensiveToCheapestParkings = async () => {
    const allExpensiveToCheapestParkings = await db.raw(`SELECT * FROM parking_spots ORDER BY price DESC`)
    return allExpensiveToCheapestParkings.rows
}

const readAllMostToLeastParkingSpaces = async () => {
    const allMostToLeastParkingSpaces = await db.raw(`SELECT * FROM parking_spots ORDER BY number_of_parking_spots DESC`)
    return allMostToLeastParkingSpaces.rows
}

const readAllLeastToMostParkingSpaces = async () => {
    const allLeastToMostParkingSpaces = await db.raw(`SELECT * FROM parking_spots ORDER BY number_of_parking_spots`)
    return allLeastToMostParkingSpaces.rows
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

const updateParking = async (id, parking_name, parking_address, number_of_parking_spots, basic_informations, price) => {
    await db.raw(`UPDATE parking_spots SET parking_name = :parking_name, parking_address = :parking_address, 
    number_of_parking_spots = :number_of_parking_spots, basic_informations = :basic_informations, price = :price 
    WHERE id = :id`, 
    {parking_name, parking_address, number_of_parking_spots, basic_informations, price, id})
}

const deleteParking = async (id) => {
    await db.raw(`DELETE FROM parking_spots WHERE id = :id`, {id})
}

export default {
    createParkingSpot,
    readAllParkings,
    readAllCheapestToExpensiveParkings,
    readAllExpensiveToCheapestParkings,
    readAllMostToLeastParkingSpaces,
    readAllLeastToMostParkingSpaces,
    readMyList,
    readParkingDetails,
    findValidUserById,
    updateParking,
    deleteParking
}