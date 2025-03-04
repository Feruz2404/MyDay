import SidebarLayout from "../layouts/SidebarLayout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { message, Upload } from "antd";
import { useGetUserQuery, useUpdateUserMutation } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";

interface ProfileData {
  first_name: string;
  last_name: string;
  phone_number_1: string;
  position: string;
  profile_photo?: File | null;
}

export default function ProfilePage() {
  const { data, isLoading } = useGetUserQuery({});
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    phone_number_1: "",
    position: "",
    profile_photo: null,
  });

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number_1: data.phone_number_1 || "",
        position: data.position || "",
        profile_photo: null,
      });
    }
  }, [data]);

  // Inputlarni yangilash
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Faylni tanlash
  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      setSelectedFile(info.file.originFileObj);
      setFormData((prev) => ({
        ...prev,
        profile_photo: info.file.originFileObj,
      }));
    }
  };

  // Formni jo‘natish
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("phone_number_1", formData.phone_number_1);
    formDataToSend.append("position", formData.position);

    if (selectedFile) {
      formDataToSend.append("profile_photo", selectedFile);
    }

    try {
      await updateUser(formDataToSend).unwrap();
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#4e31cc" size="small" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <SidebarLayout>
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <div className="pb-2 mb-6 flex space-x-6">
            <h1 className="text-lg font-semibold text-gray-800">Profile</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
            <div className="w-[50%] flex flex-col gap-4">
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-22 h-22 rounded-full mb-4 overflow-hidden border flex items-center justify-center bg-blue-500 text-white text-4xl">
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="profile_photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    formData.first_name.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <Upload.Dragger
                  showUploadList={false}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => onSuccess?.("ok"), 0);
                    setSelectedFile(file as File);
                  }}
                  onChange={handleFileChange}
                  className="mt-3 border-2 border-dashed border-gray-300 rounded-lg w-full text-center"
                >
                  <p className="text-blue-500 cursor-pointer">Browse Files</p>
                </Upload.Dragger>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  First name*
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last name*
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone number*
                </label>
                <input
                  type="text"
                  name="phone_number_1"
                  value={formData.phone_number_1}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Who is the employee?
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Example: founder or marketer..."
                  className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                className="px-10 cursor-pointer py-2 border border-gray-400 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-12 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </SidebarLayout>
    </div>
  );
}
