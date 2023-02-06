export default function Services({ business_id, businessDetail_id }) {
  return (
    <div className="w-full px-4 pb-8 md:px-12">
      <div className="text-primary-500 text-2xl font-semibold py-4">Description</div>
      <div className="bg-white rounded shadow-md p-4 md:px-6">
        <span className="flex text-sm text-gray-500 text-justify">
          {businessDetail_id?.business_description}
        </span>
        <div className="border-b-2 my-4 px-4 md:mx-20"></div>
        <div className="flex flex-col gap-3 px-8 md:px-12 mt-6 text-sm ">
          <div className="grid grid-cols-1 md:grid-cols-4 text-gray-500">
            <span className="font-semibold ">Experience Label</span>
            <span>{business_id?.experience_level}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 text-gray-500">
            <span className="font-semibold ">Years Establish</span>
            <span>{business_id?.years_established} Years</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 text-gray-500">
            <span className="font-semibold ">Number of Brances</span>
            <span>{business_id?.branches} Brances</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 text-gray-500">
            <span className="font-semibold ">Number of stuff Employed</span>
            <span>{business_id?.business_employees.length} stuffs</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-8 md:px-12 mt-6 text-sm text-gray-500">
          <div className="grid grid-cols-1 items-center md:grid-cols-8">
            <span className="col-span-1 font-semibold py-2">Qualification</span>
            <div className="flex col-span-6 gap-2 flex-wrap">
              {business_id?.qualifications.map((qualification, index) => (
                <div key={index} className="bg-primary-500 px-4 py-1 rounded">
                  <span className="text-white">{qualification}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 items-center md:grid-cols-8">
            <span className="col-span-1 font-semibold py-2">Speciality Area</span>
            <div className="flex col-span-6 gap-2 flex-wrap">
              {business_id?.speciality_area.map((speciality, idx) => (
                <div key={idx} className="bg-primary-500 py-1 px-4 rounded ">
                  <span className="flex text-white">{speciality}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
