import Patient from "../schemas/patient.js";
export const getallpatient = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      location: "error in get patient",
      message: error.message,
    });
  }
};
export const addpatient = async (req, res) => {
  try {
    const patient = req.body;
    const newpatient = new Patient(patient);
    const added = await newpatient.save();
    res.status(200).json(added);
  } catch (error) {
    res.status(500).json({
      location: "error in add patient",
      message: error.message,
    });
  }
};
export const deletepatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedpatient = await Patient.findByIdAndDelete(id);
    if (!deletedpatient)
      return res.status(400).json({
        message: " ID not found",
      });

    res.status(200).json(deletedpatient);
  } catch (error) {
    res.status(500).json({
      location: "error in delete patient",
      message: error.message,
    });
  }
};
// export const updatepatient = async (req, res) => {
//   try {
//     const getID = req.params.id;
//     const updateData = req.body;

//     const updatedpatient = await Patient.findByIdAndUpdate(getID, updateData, {
//       new: true,
//     });

//     if (!updatedpatient) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json(updatedpatient);
//   } catch (error) {
//     res.status(500).json({
//       location: "error in update patient",
//       message: error.message,
//     });
//   }
// };
export const updatepatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedData = req.body;

    // Utilisez mongoose.Types.ObjectId pour convertir la chaîne de l'ID en ObjectId
    const objectIdPatientId = new ObjectId(patientId);

    // Utilisez la méthode updateOne pour mettre à jour le document du patient
    const result = await Patient.updateOne(
      { _id: objectIdPatientId },
      updatedData
    );

    if (result.nModified > 0) {
      res.status(200).json({ message: "Patient updated successfully" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({
      location: "error in update patient",
      message: error.message,
    });
  }
};
