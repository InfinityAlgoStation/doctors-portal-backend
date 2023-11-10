import { SuperAdmin } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createSuperAdmin = async (
  superAdmin: SuperAdmin
): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.create({
    data: superAdmin,
  });
  return result;
};

const getAllSuperAdmins = async (): Promise<SuperAdmin[] | any> => {
  const result = await prisma.superAdmin.findMany();
  const total = await prisma.superAdmin.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleSuperAdmin = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateSuperAdmin = async (
  id: string,
  superAdmin: SuperAdmin
): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.update({
    where: {
      id: id,
    },
    data: superAdmin,
  });
  return result;
};

const deleteSuperAdmin = async (id: string): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const SuperAdminServices = {
  createSuperAdmin,
  getAllSuperAdmins,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
