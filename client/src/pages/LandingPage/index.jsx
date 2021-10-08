import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import NavbarLandingPage from '../../components/NavbarLandingPage'
import Photo1 from '../../images/gambar01.jpg'
import Photo2 from '../../images/gambar1.jpg'
const LandingPage = () => {
   return (
      <Box>
         <NavbarLandingPage navVisible={true} />
         {/* Home */}
         <Box
            h='90vh'
            id='home'
            display='flex'
            px={['25px', '100px']}
            pt={['20px', '80px']}
            mb='30px'
            overflow='hidden'
            flexDirection={['column-reverse', 'row']}
         >
            <Box flex='0.7' mt={['20px', '0', '0', '0px']}>
               <Text
                  fontSize={['2xl', '3xl', '4xl', '5xl']}
                  fontWeight='700'
                  textAlign='left'
               >
                  SMP DHARMA BHAKTI TANGERANG
               </Text>

               <Text
                  mt={['1px', '1px']}
                  w='90%'
                
                  textAlign='justify'
               >
                  Jl. KH Hasyim Ashari No.9, RT.004/006 Kel. Sudimara Pinang, Kec. Pinang, Kota Tangerang, Banten 
                  15145
               </Text>
               


               <Text
                  mt={['20px', '40px']}
                  w='90%'
                  fontSize={['md', 'lg', 'l']}
                  textAlign='justify'
               >
                  SMP Dharma Bhakti adalah Sekolah Menangah Pertama yang mempunyai kualitas baik dari sisi 
                  akademik maupun non akademik, ditunjang dengan tenaga guru yang profesional dan ahli dalam
                  bidangnya. lingkungan yang sehat,bersih,aman,dan nyaman untuk belajar. Fasilitas yang memadai dan 
                  sistem mengajar yang sesuai dengan kurikulum yang berlaku. 
                 
               </Text>
               <text
                 mt={['20px', '40px']}
                 w='90%'
                 fontSize={['md', 'lg', 'xl']}
                 textAlign='bold'
               >
               SMP Dharma Bhakti Bisa , Kuat , Dan Mandiri Untuk Terus Berprestasi.  
               </text>
            </Box>

            <Box
               flex='0.35'
               display='flex'
              
               justifyContent='center'
            >
               <Image
                  // boxSize={['full', '400px']}
                  w='full'
                  h={['300px', '400px']}
                  borderRadius='lg'
                  objectFit='cover'
                  src={Photo1}
                  alt='Segun Adebayo'
               />
            </Box>
         </Box>

         {/* Sejarah */}
         <Box
            bg='#3399ff'
            h='max-content'
            px={['25px', '100px']}
            pt={['40px', '80px']}
            pb={['40px', '80px']}
            id='sejarah'
            mb='30px'
         >
            <Text fontWeight='700' fontSize={['2xl', '3xl', '4xl', '5xl']}>
               Sejarah
            </Text>
            <Flex mt={['20px', '50px']} flexDirection={['column', 'row']}>
               <Box flex='1.2'>
                  <Image
                     w='full'
                     h={['300px', '400px']}
                     // boxSize={['300px', '400px']}
                     borderRadius='lg'
                     objectFit='cover'
                     src={Photo2}
                     alt='Segun Adebayo'
                  />
               </Box>

               <Box flex='0.7'>
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     textAlign='justify'
                     ml={['0px', '50px']}
                     mt={['30px', '0px']}
                  >
                    SMP Dharma Bhakti pertama kali didirikan pada tahun 1989 yang dimotori oleh Bpk Drs H. Yusuf Msi 
                    selaku Ketua Yayasan dan Bpk Misan Spd selaku Kepala Sekolah dan Bpk Drs Munasir selaku Wakil Kepala Sekolah. Pertama kali didirikan dengan membawa Yayasan Dharma Bhakti yang kemudian diberikan nama SMP Dharma Bhakti yang 
                    mendapatkan surat Izin operasional dari Pemerintah Kota Tangerang pada Tanggal 06-02-1989 dengan SK Izin Operasional
                    859/1.02/KEP/E.91.
                  
                  </Text>
               </Box>
            </Flex>
         </Box>

         {/* Visi dan Misi */}
         <Box
            h='max-content'
            px={['25px', '100px']}
            pt={['20px', '80px']}
            pb={['40px', '80px']}
            id='visi-misi'
         >
            <Text fontWeight='700' fontSize={['2xl', '3xl', '4xl', '5xl']}>
               Visi dan Misi
            </Text>
            <Flex mt='30px' flexDirection={['column', 'row']}>
               <Box flex='0.5'>
                  <Text fontWeight='700' fontSize={['lg', 'xl', '2xl', '3xl']}>
                     Visi
                  </Text>

                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     1. Konsisten disegani, terpercaya, solid, dan profesional memajukan sekolah unggulan, bermutu dan berakhlaqul karimah.
                  </Text>
                  
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     2. Konsisten disegani, terpercaya, solid, dan profesional memajukan sekolah unggulan, bermutu dan berakhlaqul karimah.
                  </Text>
                  
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     3. Konsisten disegani, terpercaya, solid, dan profesional memajukan sekolah unggulan, bermutu dan berakhlaqul karimah.
                  </Text>
               </Box>

               <Box flex='0.5' mt={['30px', '0px']}>
                  <Text fontWeight='700' fontSize={['lg', 'xl', '2xl', '3xl']}>
                     Misi
                  </Text>

                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     1. Menyukseskan pembangunan nasional khususnya pendidikan dan kebudayaan.
                  </Text>
                  
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     2. Mewujudkan lulusan yang bermutu yaitu lulusan yang berprestasi akademik dan non akademik, dengan 
                     pembelajaran dan pelatihan yang intensif.
                  </Text>
                  
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     3. Mewujudkan pendidikan dan tenaga kerja kependidikan yang memenuhi syarat kualifikasi dan kompetensi
                     professional dengan studi lanjut dan berbagai pelatihan.
                  </Text>
               </Box>
            </Flex>
         </Box>

         <Box h='30px' bg='#ECEEF2'></Box>
      </Box>
   )
}

export default LandingPage
