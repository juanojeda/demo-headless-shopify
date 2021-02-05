import styled from "styled-components";
import Link from "next/link";
import Drawer from "./Drawer";
import { DeleteMajor, MobileCancelMajor } from "@shopify/polaris-icons";
import Title from "./Title";
import HorizontalRule from "./HorizontalRule";
import Icon from "./Icon";
import { useContext } from "react";
import { ShopifyContext } from "../hooks/withShopifyContext";
import { formatPrice } from "../utils/formatPrice";
import { getColor } from "../utils/themeHelpers";

const G_ITEM_IMG = "itemImage";
const G_ITEM_TITLE = "itemTitle";
const G_ITEM_PRICE = "itemPrice";
const G_ITEM_REMOVE = "itemRemove";

const CartHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  position: relative;

  ${HorizontalRule};
`;

const CloseIcon = styled(Icon)`
  order: 2;
`;

const CartContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  padding: 1rem 0;
`;

const EmptyCart = styled.div`
  padding: 2rem;
  text-align: center;
  align-self: center;
`;
const EmptyCartCTA = styled.div`
  margin: 1rem;
`;

const LineItem = styled.div`
  background: ${getColor("realWhite")};
  border-radius: 0.4rem;
  display: grid;
  grid-template-areas: ${`
    "${G_ITEM_IMG} ${G_ITEM_TITLE} ${G_ITEM_REMOVE}"
    "${G_ITEM_IMG} ${G_ITEM_PRICE} ${G_ITEM_PRICE}"
  `};
  grid-template-columns: 6rem 1fr 4rem;
  grid-column-gap: 1.5rem;
  margin: 0.5rem 0;
  padding: 1rem;
  width: 100%;
`;

const ItemImage = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  grid-area: ${G_ITEM_IMG};
`;

const ItemTitle = styled.div`
  grid-area: ${G_ITEM_TITLE};
  font-size: 2rem;
`;

const ItemPrice = styled.div`
  grid-area: ${G_ITEM_PRICE};
  font-weight: 100;
`;

const ItemRemove = styled.button`
  appearance: none;
  background: 0;
  border: 0;
  cursor: pointer;
  grid-area: ${G_ITEM_REMOVE};
  padding: 0;
`;

const StyledRemoveIcon = styled(Icon)`
  fill: ${getColor("neutral")};
  padding: 0 1.25rem;
  width: 100%;
  &:hover {
    fill: ${getColor("primary")};
  }
`;

const EmptyCartContent = () => (
  <EmptyCart>
    You have no items in your cart.
    <EmptyCartCTA>
      Check out our{" "}
      <Link href="/" passHref>
        <a>knives on sale.</a>
      </Link>
    </EmptyCartCTA>
  </EmptyCart>
);

const CartLineItem = ({ item }) => (
  <LineItem>
    <ItemImage src={item.variant.image.src} />
    <ItemTitle>{item.title}</ItemTitle>
    <ItemPrice>{formatPrice(item.variant.priceV2)}</ItemPrice>
    <ItemRemove>
      <StyledRemoveIcon icon={DeleteMajor} />
    </ItemRemove>
  </LineItem>
);

const CartContent = () => {
  const { cart, loading } = useContext(ShopifyContext);
  const hasItems = cart.lineItems.length > 0;

  return (
    <CartContentWrapper>
      {loading ? (
        <Loading />
      ) : hasItems ? (
        cart.lineItems.map((item) => <CartLineItem key={item.id} item={item} />)
      ) : (
        <EmptyCartContent />
      )}
    </CartContentWrapper>
  );
};

const CartDrawer = ({ closeCart }) => {
  return (
    <Drawer isOpen fromDirection="right" onClose={closeCart}>
      <CartHeader>
        <CloseIcon icon={MobileCancelMajor} onClick={closeCart} />
        <Title level="H2">Your cart</Title>
      </CartHeader>
      <CartContent />
    </Drawer>
  );
};

export default CartDrawer;
