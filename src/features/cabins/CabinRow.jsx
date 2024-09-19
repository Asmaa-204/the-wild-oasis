import styled from "styled-components";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";

import CabinForm from "./CabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.4) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { isCreating, mutate: duplicate } = useCreateCabin();

  function handleDuplicate() {
    duplicate({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row type="horizontal">
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={handleDuplicate}
                  />
                  <Modal.Open opens="delete-cabin">
                    <Menus.Button
                      icon={<HiTrash />}
                    />
                  </Modal.Open>

                  <Modal.Open opens="edit-form">
                    <Menus.Button>
                      <HiPencil />
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>

              <Modal.Window name="delete-cabin">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                />
              </Modal.Window>

              <Modal.Window name="edit-form">
                <CabinForm cabin={cabin} />
              </Modal.Window>
            </Modal>
          </div>
        </Row>
      </Table.Row>
    </>
  );
}
