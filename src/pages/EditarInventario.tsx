import TipoInventarioForm from '@/components/Forms/tipoInventario/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarInventario = () => {
  const location = useLocation();
  const inventarioData = location.state;

  return (
    <ContentLayout title="Editar Cliente">
      <h1 className="text-2xl text-left mb-10">
        {inventarioData.codInventario} - {inventarioData.Detalle}
      </h1>
      <TipoInventarioForm
        isEdit={true}
        initialValues={{
          codInventario: inventarioData.codInventario,
          Detalle: inventarioData.Detalle,
        }}
      />
    </ContentLayout>
  );
};

export default EditarInventario;
