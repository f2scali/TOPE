import CriteriosForm from '@/components/Forms/criterio/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';

const EditarCriterio = () => {
  const location = useLocation();
  const CriterioData = location.state;

  return (
    <ContentLayout title="Editar Criterio">
      <h1 className="text-2xl text-left mb-10">
        {CriterioData.codCriterio} - {CriterioData.Detalle}
      </h1>
      <CriteriosForm
        isEdit={true}
        initialValues={{
          codCriterio: CriterioData.codCriterio,
          Detalle: CriterioData.Detalle,
          id_tipo_inv: CriterioData.id_tipo_inv?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarCriterio;
