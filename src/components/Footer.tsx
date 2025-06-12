import { Link } from "@heroui/react";
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-content3 text-content3-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p>&copy; 2024 Freire FPV - Carlos Pastor Freire</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Instagram">
              <Icon icon="lucide:instagram" width={24} height={24} />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Icon icon="lucide:youtube" width={24} height={24} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Icon icon="lucide:twitter" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;