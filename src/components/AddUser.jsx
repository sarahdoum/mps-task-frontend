import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { Button, Loading, ModalWrapper, Textbox } from "./";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const res = await updateUser(data).unwrap();
        toast.success(res?.message);
        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...res?.user }));
        }
      } else {
        const res = await addNewUser({
          ...data,
          password: data?.email,
        }).unwrap();
        toast.success("Nouvel utilisateur ajouté avec succès");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ?  "METTRE À JOUR LE PROFIL" : "AJOUTER UN NOUVEL UTILISATEUR"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nom Complet'
              type='text'
              name='name'
              label='Nom Complet'
              className='w-full rounded'
              register={register("name", {
                required:  "Le nom  complet est requis!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Tire'
              type='text'
              name='title'
              label='Titre'
              className='w-full rounded'
              register={register("title", {
                required: "Le Titre est requis!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Adresse E-mail'
              type='email'
              name='email'
              label='Adresse E-mail'
              className='w-full rounded'
              register={register("email", {
                required: "Adresse E-mail est requise!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="Rôle "
              type='text'
              name='role'
              label="Rôle "
              className='w-full rounded'
              register={register("role", {
                required: "Le Rôle de l'utilisateur est requis!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Soumettre'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Annuler'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
