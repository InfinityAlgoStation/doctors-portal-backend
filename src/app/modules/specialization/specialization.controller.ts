import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SpecializationService } from './specialization.service';

const createSpecialization = catchAsync(async (req: Request, res: Response) => {
  const { ...specializationData } = req.body;
  const specialization = await SpecializationService.createSpecialization(
    specializationData
  );
  res.status(200).json({
    status: 'success',
    message: 'Specialization created successfully',
    data: specialization,
  });
});
const getAllSpecializations = catchAsync(
  async (req: Request, res: Response) => {
    const specializations = await SpecializationService.getAllSpecializations();
    res.status(200).json({
      status: 'success',
      message: 'Specializations fetched successfully',
      data: specializations.data,
    });
  }
);
const getSingleSpecialization = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const specialization = await SpecializationService.getSingleSpecialization(
      id
    );
    res.status(200).json({
      status: 'success',
      message: 'Specialization fetched successfully',
      data: specialization,
    });
  }
);
const updateSpecialization = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...specializationData } = req.body;
  const specialization = await SpecializationService.updateSpecialization(
    id,
    specializationData
  );
  res.status(200).json({
    status: 'success',
    message: 'Specialization updated successfully',
    data: specialization,
  });
});
const deleteSpecialization = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const specialization = await SpecializationService.deleteSpecialization(id);
  res.status(200).json({
    status: 'success',
    message: 'Specialization deleted successfully',
    data: specialization,
  });
});

export const SpecializationController = {
  createSpecialization,
  getAllSpecializations,
  getSingleSpecialization,
  updateSpecialization,
  deleteSpecialization,
};
