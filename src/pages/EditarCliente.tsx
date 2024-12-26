import ClientesForm from '@/components/Forms/clientes/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarCliente = () => {
  const location = useLocation();
  const clienteData = location.state;
  console.log(clienteData);
  return (
    <ContentLayout title="Editar Cliente">
      <h1 className="text-2xl text-left mb-10">
        {clienteData.NIT} - {clienteData.Descripcion}
      </h1>
      <ClientesForm
        isEdit={true}
        initialValues={{
          NIT: clienteData.NIT,
          Descripcion: clienteData.Descripcion,
          id_Tipo_Cliente: clienteData.id_Tipo_Cliente?.toString(),
          id_Lista_Precio: clienteData.id_Lista_Precio?.toString(),
          id_Vendedor: clienteData.id_Vendedor?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarCliente;
