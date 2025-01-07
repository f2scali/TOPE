import VendedorForm from '@/components/Forms/vendedor/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarVendedor = () => {
  const location = useLocation();
  const vendedorData = location.state;

  return (
    <ContentLayout title="Editar Vendedor">
      <h1 className="text-2xl text-left mb-10">
        {vendedorData.usuario.codUsuario} -{' '}
        {`${vendedorData.NOMBRE} ${vendedorData.APELLIDO}`}
      </h1>
      <VendedorForm
        isEdit={true}
        initialValues={{
          NOMBRE: vendedorData.NOMBRE,
          APELLIDO: vendedorData.APELLIDO,
          Correo: vendedorData.Correo,
          Telefono: vendedorData.Telefono,
          idUsuario: vendedorData.idUsuario?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarVendedor;
