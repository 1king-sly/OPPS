'use client'
import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import clsx from 'clsx'

export default function Refer({ projectId, userName }: { projectId: string; userName: string }) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    projectId: projectId,
    updatedBy: userName,
    status: '',
    comment: '',
  });
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const toggleLoading = useCallback(() => {
    setLoading((prevLoading) => !prevLoading);
  }, []); 
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (referBtnValue: string) => {
      toggleLoading();
      setFormData((prevFormData) => ({
        ...prevFormData,
        status: referBtnValue,
      }));
    },
    [toggleLoading]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.loading('Updating Project...');

        const update = await fetch('/api/updateProject', {
          method: 'PUT',
          body: JSON.stringify(formData),
        });

        if (update?.ok && update?.status === 200) {
          toast.dismiss();
          toast.success('Project updated successfully');
          router.push('/Admin/Projects');
        } else if (update?.status !== 200) {
          toast.dismiss();
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.dismiss();
        toast.error('Something went wrong');
      } finally {
        toggleLoading();
      }
    };

    if (formData.status) {
      fetchData();
    }
  }, [formData, router, toggleLoading]);

  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  return (
    <div className="w-full h-full ">
      <p>Add a comment (Optional)</p>
      <textarea
        name="comment"
        id="comment"
        placeholder="Add a comment"
        className="w-full outline-sky-300 resize-none p-2 h-48 text-gray-900"
        onChange={handleChange}
        disabled={disabled}
      ></textarea>
      <div className="w-full justify-around flex mt-2">
        <button
          className={clsx(`bg-orange-300 p-3 rounded-md`, visible && `hidden`)}
          onClick={toggleVisibility}
          disabled={disabled}
        >
          External Moderator
        </button>
        <button
          className={clsx(`p-3 bg-green-500 rounded-md`, visible && `hidden`)}
          onClick={() => handleSubmit('ACCEPTED')}
          disabled={disabled}
        >
          ACCEPT
        </button>
        <button
          className={clsx(`p-3 bg-rose-500  rounded-md`, visible && `hidden`)}
          onClick={() => handleSubmit('REJECTED')}
          disabled={disabled}
        >
          REJECT
        </button>
      </div>

      <div className={clsx(`w-full flex flex-col`, !visible && `hidden`)}>
        <input
          type="email"
          name="email"
          title="refer email"
          onChange={handleChange}
          disabled={disabled}
          className="p-3 "
        />

        <div className="w-full flex justify-end mt-3">
          <button
            className="bg-orange-300 p-3 rounded-md"
            name="status"
            disabled={disabled}
            onClick={() => handleSubmit('REFERRED')}
          >
            REFER
          </button>
        </div>
      </div>
    </div>
  );
}
