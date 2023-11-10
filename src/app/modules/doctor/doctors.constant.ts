export const doctorSearchableFields = [
  'fullName',
  'address',
  'qualification',
  'phoneNumber',
  'email',
];

export const doctorFilterableFields = ['searchTerm', 'gender', 'location'];

export const doctorRelationalFields: string[] = ['specializationId'];
export const doctorRelationalFieldsMapper: { [key: string]: string } = {
  specializationId: 'specializationId',
};
