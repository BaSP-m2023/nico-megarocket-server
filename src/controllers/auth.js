import Member from '../models/Member';
import SuperAdmin from '../models/SuperAdmin';
import Admin from '../models/Admins';
import Trainer from '../models/Trainer';

const getAuth = async (req, res) => {
  try {
    const member = await Member.findOne({ firebaseUid: req.headers.firebaseUid });
    if (member) {
      return res.status(201).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    }

    const admin = await Admin.findOne({ firebaseUid: req.headers.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }

    const superAdmin = await SuperAdmin.findOne({ firebaseUid: req.headers.firebaseUid });
    if (superAdmin) {
      return res.status(201).json({
        message: 'Super Admin found',
        data: superAdmin,
        error: false,
      });
    }

    const trainer = await Trainer.findOne({ firebaseUid: req.headers.firebaseUid });
    if (trainer) {
      return res.status(201).json({
        message: 'Trainer found',
        data: trainer,
        error: false,
      });
    }

    return res.status(404).json({
      message: 'User not found',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: null,
      error: true,
    });
  }
};

export default { getAuth };
