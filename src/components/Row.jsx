import React, { useState, useEffect } from 'react';
import { useEditRowMutation } from '../features/api/apiSlice';
import { useForm } from 'react-hook-form';
import { selectRow, unSelectRow } from '../features/viewSlice';
import { useDispatch, useSelector } from 'react-redux';

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')} Hours ${mins.toString().padStart(2, '0')} Minutes`;
};

const Row = ({ id, topic, duration, link, status, onDeleteClick, masterChecked }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { topic, duration, link }
  });

  const [editRow] = useEditRowMutation();
  const viewGlobal = useSelector((state) => state.view.mode)

  useEffect(() => {
    setValue("topic", topic);
    setValue("duration", duration);
    setValue("link", link);
  }, [topic, duration, link, setValue]);

  useEffect(() => {
    //debugger
    console.log(masterChecked, "master")
    setIsChecked(masterChecked)
  }, [masterChecked])

  useEffect(() => {
    console.log("local check state ", isChecked)

    if (viewGlobal === (status ? "show" : "hide")) {
      if (isChecked) {
        dispatch(selectRow(returnProperObject({ id, topic, duration, link, status })))
      } else {
        dispatch(unSelectRow({ id }))
      }

    }
  }, [isChecked])


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  const returnProperObject = (data) => {
    const Topic = data.topic;
    const Duration = Number(data.duration);
    const Link = data.link;
    const Status = status;
    const Id = id;
    return { Id, Topic, Duration, Link, Status }
  }
  const handleSaveEdit = (data) => {
    editRow(returnProperObject(data));
    setIsEditing(false);
  };

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {


    setIsChecked(!isChecked)
  };


  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-100">
        <td className="px-6 py-4">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </td>
        <td className="px-6 py-4">
          <input
            {...register("topic", {
              required: "Topic is required",
              minLength: {
                value: 5,
                message: "Please make sure the length of the topic is greater than 5."
              }
            })}
            type="text"
            name="topic"
            disabled={!isEditing}
            className="w-full border-none bg-transparent focus:ring-0"
          />
          {errors.topic && <span className="text-red-500">{errors.topic.message}</span>}
        </td>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              {...register("duration", {
                required: "Duration is required",
                min: { value: 0, message: "Duration must be at least 0" }
              })}
              type="number"
              name="duration"
              className="w-full border-none bg-transparent focus:ring-0"
            />
          ) : (
            <span>{formatDuration(duration)}</span>
          )}
          {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
        </td>
        <td className="px-6 py-4">
          <input
            {...register("link", {
              required: "Link is required",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Please enter a valid URL"
              }
            })}
            type="url"
            name="link"
            disabled={!isEditing}
            className="w-full border-none bg-transparent focus:ring-0"
          />
          {errors.link && <span className="text-red-500">{errors.link.message}</span>}
        </td>
        <td className="px-6 py-4 flex justify-end space-x-2">
          {isEditing ? (
            <button
              onClick={handleSubmit(handleSaveEdit)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDeleteClick(id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Row;
