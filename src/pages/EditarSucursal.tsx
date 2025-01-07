import SucursalForm from '@/components/Forms/sucursal/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarSucursal = () => {
  const location = useLocation();
  const SucursalData = location.state;

  return (
    <ContentLayout title="Editar Sucursal">
      <h1 className="text-2xl text-left mb-10">
        {SucursalData.codSucursal} - {SucursalData.Detalle}
      </h1>
      <SucursalForm
        isEdit={true}
        initialValues={{
          codSucursal: SucursalData.codSucursal,
          Detalle: SucursalData.Detalle,
          Direccion: SucursalData.Direccion,
          Telefono: SucursalData.Telefono,
          id_Cliente: SucursalData.id_Cliente?.toString(),
          id_Lista_Precio: SucursalData.id_Lista_Precio?.toString(),
          id_Vendedor: SucursalData.id_Vendedor?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarSucursal;
