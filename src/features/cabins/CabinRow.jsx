import styled from "styled-components";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import CabinForm from "./CabinForm";
import Row from "../../ui/Row";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
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
  const [showEditCabin, setShowEditCabin] = useState(false);
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
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row type="horizontal">
          <div>
            <button disabled={isCreating} onClick={handleDuplicate}>
              <HiSquare2Stack />
            </button>
            <button onClick={() => deleteCabin(id)} disabled={isDeleting}>
              <HiTrash />
            </button>
            <Modal>
              <Modal.Open opens="edit-form">
                <button>
                  <HiPencil />
                </button>
              </Modal.Open>
              <Modal.Window name="edit-form">
                <CabinForm cabin={cabin} />
              </Modal.Window>
            </Modal>
          </div>
        </Row>
      </TableRow>
    </>
  );
}
