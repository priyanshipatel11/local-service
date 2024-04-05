const BookingsSchema = require("../models/BookingsModel");

const createBookings = async (req, res) => {
  try {
    const savedBook = await BookingsSchema.create(req.body);
    res.status(201).json({
      message: "Bookings Created",
      data: savedBook,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      data: error,
      flag: -1,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const getBook = await BookingsSchema.find()
      .populate({
        path: "service",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate("serviceprovider")
      .populate("user");
    res.status(200).json({
      message: "Bookings fetched",
      data: getBook,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bookings not found",
      data: error,
      flag: -1,
    });
  }
};

const getBookingsById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await BookingsSchema.findById(id)
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    res.status(200).json({
      message: "Booking found",
      data: booking,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting booking",
      data: [],
      flag: -1,
    });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const booking = await BookingsSchema.find({ user: userId })
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    if (booking && booking.length > 0) {
      res.status(200).json({
        message: "Booking are found",
        data: booking,
        flag: 1,
      });
    } else {
      res.status(400).json({
        message: "Booking are not found",
        data: [],
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Booking are not found",
      flag: 1,
      data: [],
    });
  }
};

const updateBookingsById = async (req, res) => {
  try {
    const id = req.params.id;
    const newBook = req.body;

    const updateBookings = await BookingsSchema.findByIdAndUpdate(id, newBook);
    if (updateBookings == null) {
      res.status(400).json({
        message: "Bookings Not Found",
        flag: -1,
      });
    } else {
      res.status(200).json({
        message: "Updating...",
        // data : updateBookings,
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Updating Bookings",
      data: error,
      flag: -1,
    });
  }
};

const deleteBookingsById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteBookings = await BookingsSchema.findByIdAndDelete(id);
    if (deleteBookings == null) {
      res.status(400).json({
        message: "Bookings Not Found",
        flag: -1,
      });
    }else {
      res.status(200).json({
        message: "Deleting Bookings...",
        data: deleteBookings,
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Deleting Bookings",
      data: error,
      flag: -1,
    });
  }
};

const updateStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateStatus = await BookingsSchema.findByIdAndUpdate(id, {
      status: "Done",
    });
    console.log(updateStatus);
    res.status(201).json({
      message: "Status Updated Successfully",
      flag: 1,
      data: updateStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const pendingStatusById = async (req, res) => {
  try {
    const doneStatus = await BookingsSchema.find({ status: "Pending" })
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    if (doneStatus && doneStatus.length > 0) {
      res.status(200).json({
        message: "Pending Status are found",
        data: doneStatus,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Pending Status Found!",
        data: [],
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: [],
    });
  }
};

const doneStatusById = async (req, res) => {
  try {
    const doneStatus = await BookingsSchema.find({
      status: "Done",
    })
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    if (doneStatus && doneStatus.length > 0) {
      res.status(200).json({
        message: "Done Status are found",
        data: doneStatus,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Done Status Found!",
        data: [],
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: [],
    });
  }
};

const getBookingByServiceProviderId = async (req, res) => {
  const serproId = req.params.id; //loggedin service provider id

  try {
    const booking = await BookingsSchema.find({
      serviceprovider: serproId,
    })
      .populate("service")
      .populate("serviceprovider")
      .populate("user")
    console.log(booking);
    if (booking && booking.length > 0) {
      res.status(200).json({
        message: "booking found",
        flag: 1,
        data: booking,
      });
    } else {
      res.status(404).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "no booking found",
      flag: -1,
      data: [],
    });
  }
};

const getDoneBookingByServiceProviderId = async (req, res) => {
  const serviceProviderId = req.params.id; //loggedin service provider id

  try {
    const doneBooking = await BookingsSchema.find({
      serviceprovider: serviceProviderId,
      status : "Done"
    })
      .populate("service")
      .populate("serviceprovider")
      .populate("user")
    console.log(doneBooking);
    if (doneBooking && doneBooking.length > 0) {
      res.status(200).json({
        message: " Done Booking found",
        flag: 1,
        data: doneBooking,
      });
    } else {
      res.status(404).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "no booking found",
      flag: -1,
      data: [],
    });
  }
};

module.exports = {
  createBookings,
  getBookings,
  getBookingsById,
  updateBookingsById,
  deleteBookingsById,
  updateStatusById,
  getBookingByUserId,
  pendingStatusById,
  doneStatusById,
  getBookingByServiceProviderId,
  getDoneBookingByServiceProviderId
};
