import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isPending } = useBooking();
  const [checked, setChecked] = useState(false);
  const [addedBreakfast, setAddedBreakfast] = useState(false);
  const { checkIn, isPending: isCheckingIn } = useCheckIn();
  const { settings } = useSettings();

  useEffect(() => {
    setChecked(booking?.isPaid ?? false);
  }, [booking]);

  if (isPending) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    // isPaid
  } = booking;

  function handleCheckin() {
    if (addedBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: breakfastPrice + totalPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  const breakfastPrice = settings?.breakfastPrice * numGuests * numNights;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          {!hasBreakfast && (
            <Checkbox
              onChange={() => {
                setChecked(false);
                setAddedBreakfast((prev) => !prev);
              }}
              disabled={isCheckingIn}
              checked={hasBreakfast || addedBreakfast}
              id="breakfast"
            >
              Add breakfast with extra price {formatCurrency(breakfastPrice)}
            </Checkbox>
          )}
        </Box>
      )}

      <Box>
        <Checkbox
          onChange={() => setChecked((prev) => !prev)}
          disabled={isCheckingIn || checked}
          checked={checked}
          id="check-in"
        >
          I confirm that {guests.fullName} have paid the booking with total
          price{" "}
          {addedBreakfast
            ? `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(breakfastPrice)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={isCheckingIn || !checked} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
