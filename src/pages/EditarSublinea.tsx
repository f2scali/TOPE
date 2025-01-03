import SublineaForm from '@/components/Forms/subLinea/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarSublinea = () => {
  const location = useLocation();
  const sublineaData = location.state;
  return (
    <ContentLayout title="Editar Sublinea">
      <h1 className="text-2xl text-left mb-10">
        {sublineaData.codSublinea} - {sublineaData.detalle}
      </h1>
      <SublineaForm
        isEdit={true}
        initialValues={{
          codSublinea: sublineaData.codSublinea,
          detalle: sublineaData.detalle,
          id_linea: sublineaData.id_linea?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarSublinea;
