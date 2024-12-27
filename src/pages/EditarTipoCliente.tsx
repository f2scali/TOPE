import TipoClientesForm from '@/components/Forms/tipoClientes/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';

const EditarTipoCliente = () => {
  const location = useLocation();
  const tipoClienteData = location.state;
  console.log(location.state);
  return (
    <ContentLayout title="Editar Tipo Cliente">
      <h1 className="text-2xl text-left mb-10">
        {tipoClienteData.codTipoCliente} - {tipoClienteData.Detalle}
      </h1>
      <TipoClientesForm
        isEdit={true}
        initialValues={{
          codTipoCliente: tipoClienteData.codTipoCliente,
          Detalle: tipoClienteData.Detalle,
        }}
      />
    </ContentLayout>
  );
};

export default EditarTipoCliente;
