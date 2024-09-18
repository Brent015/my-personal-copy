// src/components/settings/ProfileSettings.tsx
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";

const profileData = {
  bannerPhotos: [
    "https://loremflickr.com/320/320/philippines,beach",
    "https://loremflickr.com/320/320/philippines,beach",
    "https://loremflickr.com/320/320/philippines,beach",
  ],
  profilePhoto: "https://loremflickr.com/320/320/philippines,company",
  agencyName: "Adventure Seekers Travel Co.",
  shortIntroduction:
    "We specialize in creating unforgettable adventures for thrill-seekers and nature lovers.",
  organizerFullName: "Maria Santos",
  organizerEmail: "maria@adventureseekers.com",
  proofOfBusiness: ["https://loremflickr.com/320/320/document"],
};

const ProfileSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [bannerPhotos, setBannerPhotos] = useState<UploadFile[]>(
    profileData.bannerPhotos.map((url, index) => ({
      uid: `-${index}`,
      name: `banner-${index}.jpg`,
      status: "done",
      url: url,
    }))
  );

  const [profilePhoto, setProfilePhoto] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "profile.jpg",
      status: "done",
      url: profileData.profilePhoto,
    },
  ]);

  const [proofOfBusiness, setProofOfBusiness] = useState<UploadFile[]>(
    profileData.proofOfBusiness.map((url, index) => ({
      uid: `-${index}`,
      name: `proof-${index}.jpg`,
      status: "done",
      url: url,
    }))
  );

  // Then set initial values for the form
  form.setFieldsValue({
    agencyName: profileData.agencyName,
    shortIntroduction: profileData.shortIntroduction,
    organizerFullName: profileData.organizerFullName,
    organizerEmail: profileData.organizerEmail,
  });

  const onFinish = (values: unknown) => {
    console.log("Profile updated:", values);
    // Handle form submission
    message.success("Profile updated successfully");
  };

  const handleBannerChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setBannerPhotos(fileList);
  };

  const handleProofOfBusinessChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setProofOfBusiness(fileList);
  };

  const handleProfilePhotoChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setProfilePhoto(fileList);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="bannerPhotos" label="Banner Photos">
        <Upload
          listType="picture-card"
          fileList={bannerPhotos}
          onChange={handleBannerChange}
          beforeUpload={beforeUpload}
          multiple
        >
          {bannerPhotos.length < 5 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item name="profilePhoto" label="Profile Photo">
        <Upload
          listType="picture-card"
          fileList={profilePhoto}
          onChange={handleProfilePhotoChange}
          beforeUpload={beforeUpload}
          maxCount={1}
        >
          {profilePhoto.length < 1 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        name="agencyName"
        label="Agency Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="shortIntroduction" label="Short Introduction">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="organizerFullName"
        label="Organizer Full Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="organizerEmail"
        label="Organizer Email"
        rules={[{ required: true, type: "email" }]}
        tooltip={{
          title: "Your receipts will be sent to this email",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="proofOfBusiness"
        label="Proof of Business Ownership"
        tooltip={{
          title:
            "Upload photos of your Facebook page, business permit, or any document that will support your legitimacy",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Upload
          listType="picture-card"
          fileList={proofOfBusiness}
          onChange={handleProofOfBusinessChange}
          beforeUpload={beforeUpload}
          multiple
        >
          {proofOfBusiness.length < 5 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Profile Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileSettings;
