import { useState } from "react";
import { Modal, Form, Input, Select, Checkbox, Button, Row, Col } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import ConfirmModal from "./ConfirmModal";
import {
  useSubjectListQuery,
  useLeadCreateMutation,
  useTeachertListQuery,
} from "../services/Service";
import { PatternFormat } from "react-number-format";

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [createLead, { isLoading: isCreating }] = useLeadCreateMutation();

  const { data: subjectsData, isLoading: subjectsLoading } =
    useSubjectListQuery(undefined);

  const { data: teachersData, isLoading: teachersLoading } =
    useTeachertListQuery(undefined);

  const subjects = subjectsData || [];

  const lessonTypes = ["individual", "group"];
  const teachers = teachersData || [];  

  const lessonTimes = [
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "17:30:00",
    "18:30:00",
    "19:30:00",
    "20:30:00",
  ];
  const leadSources = [
    { label: "Website", value: 0 },
    { label: "Instagram", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Twitter", value: 3 },
    { label: "Recommendation", value: 4 },
    { label: "Friend", value: 5 },
    { label: "Other", value: 6 },
  ];


  const handleConfirm = () => {
    form
      .validateFields()
      .then(() => setIsConfirmOpen(true))
      .catch((info) => console.log("Validation Failed:", info));
  };

  const handleFinalConfirm = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("New Lead Data:", values);
        try {
          await createLead(values).unwrap();
          onConfirm();
          form.resetFields();
          setShowMore(false);
          onClose();
          setIsConfirmOpen(false);
        } catch (error) {
          console.error("Lead creation failed:", error);
        }
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  return (
    <>
      <Modal
        title="Add new lead"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
      >
        <p className="text-gray-500 text-sm">
          By creating a new lead, you will also be adding a new customer to the
          customer base.
        </p>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First name"
                name="first_name"
                rules={[{ required: true, message: "First name is required!" }]}
              >
                <Input placeholder="John" autoFocus />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last name"
                name="last_name"
                rules={[{ required: true, message: "Last name is required!" }]}
              >
                <Input placeholder="Anderson" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone number"
                name="phone"
                rules={[
                  { required: true, message: "Telefon raqam kiritish shart!" },
                  {
                    pattern: /^\+998\d{9}$/,
                    message: "Telefon raqam noto'g'ri! (+998901234567)",
                  },
                ]}
              >
                <PatternFormat
                  format="+998#########"
                  allowEmptyFormatting
                  mask="_"
                  customInput={Input}
                  placeholder="+998901234567"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select subject"
                name="subject"
                rules={[
                  { required: true, message: "Select subject is required!" },
                ]}
              >
                <Select
                  placeholder="Select"
                  loading={subjectsLoading}
                  options={subjects?.map((subj: any) => ({
                    label: subj?.name,
                    value: subj?.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            className="flex items-center justify-between cursor-pointer border-b pb-1 text-gray-600"
            onClick={() => setShowMore(!showMore)}
          >
            <span>{showMore ? "Hide" : "Show more"}</span>
            {showMore ? <UpOutlined /> : <DownOutlined />}
          </div>
          {showMore && (
            <>
              <Row gutter={16} className="mt-4">
                <Col span={12}>
                  <Form.Item label="Select lesson type" name="lesson_type">
                    <Select
                      placeholder="Select"
                      options={lessonTypes.map((type) => ({
                        label: type,
                        value: type,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Select teacher" name="teacher">
                    <Select
                      placeholder="Select"
                      loading={teachersLoading}
                      options={teachers?.map((teacher: any) => ({
                        label: teacher?.teacher_name,
                        value: teacher?.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Select lesson time" name="lesson_time">
                    <Select
                      placeholder="Select"
                      options={lessonTimes.map((time) => ({
                        label: time,
                        value: time,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Select lead source" name="source">
                    <Select placeholder="Select" options={leadSources} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Form.Item name="addToBoard" valuePropName="checked">
            <Checkbox>Add to lead board</Checkbox>
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleConfirm} loading={isCreating}>
              Confirm
            </Button>
          </div>
        </Form>
      </Modal>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleFinalConfirm}
      />
    </>
  );
};

export default NewLeadModal;
