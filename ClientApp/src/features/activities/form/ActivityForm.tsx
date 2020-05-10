import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
        editActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          onChange={handleInputChange}
          name="title"
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          rows={2}
          placeholder="Description"
          onChange={handleInputChange}
          name="description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          onChange={handleInputChange}
          name="category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          onChange={handleInputChange}
          name="date"
          value={activity.date}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          onChange={handleInputChange}
          name="city"
          value={activity.city}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          onChange={handleInputChange}
          name="venue"
          value={activity.venue}
        ></Form.Input>

        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};