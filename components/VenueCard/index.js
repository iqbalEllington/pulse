import Link from "next/link";
import Image from "next/image";
import handproper from "../../assets/images/handpicked_property1.png";

const VenueCard = ({ name, index, rm, id }) => {
  return (
    <Link legacyBehavior href={"/manage-venue/" + id}>
      <div key={index} className="col-md-4">
        <div class="card iq-product-custom-card animate:hover-media mb-0">
          <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
            <Image
              src={handproper}
              alt="Picture of the author"
              width={400}
              height={300}
            />
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <a
                href="../e-commerce/product-detail.html"
                class="h6 iq-product-detail mb-0"
              >
                {name}
              </a>
            </div>
            <strong>
              <h5 class="mb-0">RM: {rm}</h5>
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
