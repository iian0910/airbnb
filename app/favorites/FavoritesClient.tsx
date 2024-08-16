'use client';

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorite!"
      />
      <div
        className="
          mt-10
          grid
          grid-col-1
          sm:grid-col-2
          md:grid-col-3
          lg:grid-col-4
          xl:grid-col-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient;