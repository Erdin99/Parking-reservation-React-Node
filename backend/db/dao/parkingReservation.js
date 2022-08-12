import db from '..'

const getData = async (id) => {
    const nameAndAddress = await db.raw(`SELECT created_by_email, parking_name, parking_address FROM parking_spots WHERE id=:id`, {id})
    return nameAndAddress.rows[0]
}

const getFreeSpots = async (id) => {
    const numberOfFreeSpots = await db.raw(`SELECT number_of_parking_spots FROM parking_spots WHERE id=:id`, {id})
    return numberOfFreeSpots.rows[0]
}

const getId = async (id) => {
    const createdById = await db.raw(`SELECT created_by_id FROM parking_spots WHERE id = :id`, {id})
    return createdById.rows[0]
}

const createParkingReservation = async (reserved_by_id, reserved_by_username, reserved_by_email, reservation_parking_id, reservation_parking_name, reservation_parking_address, registration_plates, begin_reservation, end_reservation, code, status, reservation_created_by_id) => {
    const createdReservation = await db.raw(`INSERT INTO parking_reservation 
    (reserved_by_id, reserved_by_username, reserved_by_email, reservation_parking_id, reservation_parking_name, 
    reservation_parking_address, registration_plates, begin_reservation, end_reservation, code, status, reservation_created_by_id) 
    VALUES 
    (:reserved_by_id, :reserved_by_username, :reserved_by_email, :reservation_parking_id, :reservation_parking_name, 
    :reservation_parking_address, :registration_plates, :begin_reservation, :end_reservation, :code, :status, :reservation_created_by_id)`,
    {reserved_by_id, reserved_by_username, reserved_by_email, reservation_parking_id, reservation_parking_name, 
    reservation_parking_address, registration_plates, begin_reservation, end_reservation, code, status, reservation_created_by_id})
    return createdReservation.rows[0]
}

const updateNumberOfParkingSpots = async (id, number_of_parking_spots) => {
    await db.raw(`UPDATE parking_spots SET number_of_parking_spots = :number_of_parking_spots WHERE id=:id`, {number_of_parking_spots, id})
}

const getParkingIdAndStatus = async (id) => {
    const parkingId = await db.raw(`SELECT reservation_parking_id, status FROM parking_reservation WHERE id = :id`, {id})
    return parkingId.rows[0]
}

const getNumberOfSpots = async (id) => {
    const number = await db.raw(`SELECT number_of_parking_spots FROM parking_spots WHERE id = :id`, {id})
    return number.rows[0]
}

const refuseReservation = async (status, id) => {
    await db.raw(`UPDATE parking_reservation SET status = :status WHERE id = :id`, {status, id})
}

const updateParkingSpots = async (id, number_of_parking_spots) => {
    await db.raw(`UPDATE parking_spots SET number_of_parking_spots = :number_of_parking_spots WHERE id = :id`,
     {number_of_parking_spots, id})
}

const getAllReservationForMyParking = async (id) => {
    const allReservations = await db.raw(`SELECT * FROM parking_reservation 
    WHERE reservation_created_by_id = :id AND status ='Odobreno'`, 
    {id})
    return allReservations.rows
}

const getAllRefusedReservationForMyParking = async (id) => {
    const allRefusedReservations = await db.raw(`SELECT * FROM parking_reservation 
    WHERE reservation_created_by_id = :id AND status = 'Odgodjeno'`, 
    {id})
    return allRefusedReservations.rows
}

const getMyReservations = async (id) => {
    const allMyReservations = await db.raw(`SELECT * FROM parking_reservation WHERE reserved_by_id = :id AND status = 'Odobreno'`, 
    {id})
    return allMyReservations.rows
}

const getMyRefusedReservations = async (id) => {
    const allMyRefusedReservations = await db.raw(`SELECT * FROM parking_reservation WHERE reserved_by_id = :id AND status = 'Odgodjeno'`, 
    {id})
    return allMyRefusedReservations.rows
}

export default {
    getData,
    getFreeSpots,
    getId,
    createParkingReservation,
    updateNumberOfParkingSpots,
    refuseReservation,
    updateParkingSpots,
    getParkingIdAndStatus,
    getNumberOfSpots,
    getAllReservationForMyParking,
    getAllRefusedReservationForMyParking,
    getMyReservations,
    getMyRefusedReservations
}