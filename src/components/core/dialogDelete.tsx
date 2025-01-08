import { FC } from 'react';
import { Dialog, DialogFooter } from '../ui/dialog';

interface DialogProps {
  handleDelete: (
    id: number,
    idProducto?: number,
    idListaPrecio?: number
  ) => void;
  setOpenDialog: (open: boolean) => void;
  selectedItem: {
    id: number;
    idProducto?: number;
    idListaPrecio?: number;
  } | null;
}
const DialogCustom: FC<DialogProps> = ({
  handleDelete,
  setOpenDialog,
  selectedItem,
}) => {
  console.log(selectedItem, 'selectedItem');
  return (
    <Dialog>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-center">
              ¿Estás seguro de borrar este registro?
            </h1>
            <DialogFooter>
              <div className="flex justify-center mx-auto mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4"
                  onClick={() => {
                    if (selectedItem) {
                      handleDelete(selectedItem.id);
                    }
                  }}
                >
                  Borrar
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </button>
              </div>
            </DialogFooter>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogCustom;
