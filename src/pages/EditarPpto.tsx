import PresupuestoForm from '@/components/Forms/presupuesto/form';
import { ContentLayout } from '@/layout/Content-layout';
import { useLocation } from 'react-router-dom';
const EditarPresupuesto = () => {
  const location = useLocation();
  const pptoData = location.state;

  return (
    <ContentLayout title="Editar Presupuesto">
      <h1 className="text-2xl text-left mb-10">
        Vendedor {pptoData.vendedor.NOMBRE} {pptoData.vendedor.APELLIDO} <br />
        <span className="text-xl">Mes {pptoData.Mes}</span>
      </h1>
      <PresupuestoForm
        isEdit={true}
        initialValues={{
          Año: pptoData.Año,
          Mes: pptoData.Mes,
          Cuota: pptoData.Cuota,
          Ventas: pptoData.Ventas,
          id_Vendedor: pptoData.id_Vendedor?.toString(),
        }}
      />
    </ContentLayout>
  );
};

export default EditarPresupuesto;
