import ParkingReservationDAO from '../db/dao/parkingReservation'

const createParkingReservation = async (id, parkingReservationDto, reservation_parking_name, reservation_parking_address, parkingReservationDto1, code, status, reservation_created_by_id) => {
    const { registration_plates, begin_reservation, end_reservation, reservation_date } = parkingReservationDto1;
    return ParkingReservationDAO.createParkingReservation(parkingReservationDto.id, parkingReservationDto.username, parkingReservationDto.email, id, reservation_parking_name, reservation_parking_address, registration_plates, begin_reservation, end_reservation, reservation_date, code, status, reservation_created_by_id);
}

const refuseReservation = async (status, id) => {
    return ParkingReservationDAO.refuseReservation(status, id)
}

const refuseUsersReservation = async (status, id) => {
    return ParkingReservationDAO.refuseUsersReservation(status, id)
}

const finishReservation = async (status, id) => {
    return ParkingReservationDAO.refuseReservation(status, id)
}

const getAllReservationForMyParking = async (parkingReservationDto) => {
    const id = parkingReservationDto.id
    return ParkingReservationDAO.getAllReservationForMyParking(id)
}

const getAllRefusedReservationForMyParking = async (parkingReservationDto) => {
    const id = parkingReservationDto.id
    return ParkingReservationDAO.getAllRefusedReservationForMyParking(id)
}

const getMyReservations = async (parkingReservationDto) => {
    const id = parkingReservationDto.id
    return ParkingReservationDAO.getMyReservations(id)
}

const getMyRefusedReservations = async (parkingReservationDto) => {
    const id = parkingReservationDto.id
    return ParkingReservationDAO.getMyRefusedReservations(id)
}

const getSearchedReservation = async (code) => {
    return ParkingReservationDAO.getSearchedReservation(code)
}

export default {
    createParkingReservation,
    refuseReservation,
    refuseUsersReservation,
    finishReservation,
    getAllReservationForMyParking,
    getAllRefusedReservationForMyParking,
    getMyReservations,
    getMyRefusedReservations,
    getSearchedReservation
}