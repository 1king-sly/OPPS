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
    moderatedBy: userName,
    status: '',
    moderatorComment: '',
  });

  const router = useRouter();

 

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

        const update = await fetch('/api/moderatorUpdate', {
          method: 'PUT',
          body: JSON.stringify(formData),
        });

        if (update?.ok && update?.status === 200) {
          toast.dismiss();
          toast.success('Project updated successfully');
          router.push('/Moderator/Dashboard');
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
        name="moderatorComment"
        id="moderatorComment"
        placeholder="Add a comment"
        className="w-full outline-sky-300 resize-none p-2 h-48 text-gray-900"
        onChange={handleChange}
        disabled={disabled}
      ></textarea>
      <div className="w-full justify-around flex mt-2">         
        <button
          className={clsx(`p-3 bg-green-500 rounded-md`, disabled && `opacity-50`)}
          onClick={() => handleSubmit('ACCEPTED')}
          disabled={disabled}
        >
          ACCEPT
        </button>
        <button
          className={clsx(`p-3 bg-rose-500  rounded-md`, disabled && `opacity-50`)}
          onClick={() => handleSubmit('REJECTED')}
          disabled={disabled}
        >
          REJECT
        </button>
      </div>
    </div>
  );
}
