import { Doctor, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/paginations';
import prisma from '../../../shared/prisma';
import {
  doctorRelationalFields,
  doctorRelationalFieldsMapper,
  doctorSearchableFields,
} from './doctors.constant';
import { IDoctorFilters } from './doctors.interface';

const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.create({
    data: doctor,
  });
  return result;
};

const getAllDoctors = async (
  filters: IDoctorFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Doctor[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (doctorRelationalFields.includes(key)) {
          return {
            [doctorRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
    include: {
      specialization: true,
      availableDoctors: {
        include: {
          availableServices: {
            include: {
              service: true,
              slot: true,
            },
          },
          slot: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDoctor = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
    include: {
      specialization: true,
      availableDoctors: {
        include: {
          availableServices: {
            include: {
              service: true,
              slot: true,
            },
          },
          slot: true,
        },
      },
    },
  });
  return result;
};

const updateDoctor = async (id: string, doctor: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.update({
    where: {
      id: id,
    },
    data: doctor,
  });
  return result;
};

const deleteDoctor = async (id: string): Promise<Doctor> => {
  const result = await prisma.doctor.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const DoctorsService = {
  createDoctor,
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
