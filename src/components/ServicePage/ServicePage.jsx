import React, { useState } from "react";
import "./ServicePage.css";

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState("residency_registration");
  const [language, setLanguage] = useState("am");

  const services = {
    birth: {
      am: { title: "የልደት ምዝገባ", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት", 
        preConditions: ["የህፃኑ ወላጆች በህይወት ካሉ አባት እና እናት ሁለቱም ወይም ልደትን ለማስመዝገብ  ከአቅም በላይ በሆነ ምክንያት ተገኝቶ ልደቱን ማስመዝገብ  ያልቻለው ወላጅ አባት ከሆነ ለህፃኑ ወላጅ እናት ልዩ የልደት ውክልና  በመስጠት እንዲሁም ተገኝታ ማስመዝገብ ያልቻለችው  ወላጅ እናት ከሆነች ለህፃኑ ወላጅ አባት ልዩ የልደት ውክልና በመሰጠት ልደትን ማስመዝገብ  ይቻላሉ፡፡ ", 
                      "ከወላጆቹ  አንዱ በህይወት የሌለ እንደሆነ በህይወት ያለው ወላጅ የሟች ወላጅን  ህጋዊ የሞት ማስረጃ ሲያቀርብ ልደቱ ይመዘገባል፡፡",
                      "ችሎታ የሌላቸው ሰዎች  በተንከባካቢዎቻቸው ወይም  በአሳዳሪዎቻቸው አማካይነት መመዝገብ ይችላሉ፡፡",
                      "ልደት የሚመዘገበው  በህይወት ለተወለደ ወይም በሕይወት ተወልዶ ወዲያውኑ ለሞተ ሲሆን ሞቶ የተወለደ ከሆነ ግን አይመዘገብም፡፡",
                      "ዕድሜው 18 ዓመትና በላይ የሆነ ልደት ምዝገባ አገልግሎት ፈላጊ ልደቱን ራሱ ማስመዝገብ አለበት፡፡",
                      "18 ዓመት ሳይሞላቸው ልጅ የወለዱ ወላጆች የልጃቸውን ልደት ለማስመዝገብ ሲቀርቡ   ከሚኖሩበት መደበኛ መኖሪያ ቦታ ካለው ዝቅተኛ አስተዳደር ጽህፈት ቤት ማንነታቸውን የሚገልጽ የድጋፍ ደብዳቤ  በማቅረብ  ልደቱን ማስመዝገብ ይችላሉ፡፡",
                      "ልደት ተመዝጋቢው የውጭ ዜጋ ከሆነ በኢትዮጵያ ውስጥ የተወለደ መሆን አለበት፡፡",
                      "ዕድሜው 18 ዓመትና በላይ የሆነ ልደት ተመዝጋቢ ወላጆቹን በሚመለከት ቦታ ላይ መረጃውን ካስሞላ በኋላ የወላጅ ፊርማ ቦታ ላይ ሰረዝ (-) ምልክት በማድረግ ይታለፋል፡፡ "], 
                      requirements: ["ልደቱ የተከሰተው  በጤና ተቋም ከሆነ አስመዝጋቢው ከጤና ተቋም የተሰጠውን የልደት ማሳወቂያ ቅጽ ማቅረብ  አለበት፡፡",
                                      "የህጻኑ አስተዳዳሪ   ወይም   ተንከባካቢ  ልደቱን  ለማስመዝገብ   ሲቀርብ ከፍርድ ቤት የተሰጠ የአሳዳሪነት  ወይም የተንከባካቢነት ሕጋዊ  ማስረጃ ዋናዉን እና ኮፒ በተጨማሪ የህጻኑ አስተዳዳሪ   ወይም   ተንከባካቢ ጊዜው ያላለፈበት ከነዋሪነት/ብሔራዊ መታወቂያ ወይም ፓስፖርት ዋናዉን እና ኮፒ በክላሰር አድርገው ማቅረብ አለባቸው፡፡",
                                      "ተጥሎ  የተገኘ ህፃንን  ለማስመዝገብ  የሚመጣ ፖሊስ ወይም አግባብ ያለው የመንግስት አካል ማንነቱን  የሚገልጽ ሕጋዊ  መታወቂያ  ወይም ማስረጃ ማቅረብ አለበት፡፡",
                                      "የልደት ተመዝጋቢው   የውጭ ዜጋ ከሆነ ከጤና ተቋም የተሰጠ ማስረጃ መቅረብ  አለበት፡፡",
                                      "የህፃኑ ወላጆች በህይወት ካሉ አባት እና እናት ሁለቱም በአካል በመቅረብ የሁለቱም ጊዜው ያላለፈበት የነዋሪነት/ብሔራዊ መታወቂያ ወይም ፓስፖርት ዋናዉን እና ኮፒ በተጨማሪ የህጻኑ የጤና ተቋም ማሳወቂያ(notfication) ወይም የጤና ተቋም የክትባት ማስረጃ ወይም የክርስትና ማስረጃ ዋናዉን እና ኮፒ በክላሰር አድርገው ማቅረብ አለባቸው፡፡ ",
                                     "ዕድሜው 18 ዓመትና በላይ የሆነ ልደት ምዝገባ አገልግሎት ፈላጊ የወረዳው መታወቂያ ያለው መሆን አለበት ፤ መታወቂያ ዋናዉን እና ኮፒ በክላሰር ማቅረብ አለበት እራሱ በአካል በመቅረብ ወይም በዉክልና ከሆነ ልዩ የልደት ውክልና የተሰጠበትን ህጋዊ ማስረጃ ዋናዉና ኮፒ የወካይ እና የተወካይ ከነዋሪነት/ብሔራዊ መታወቂያ ወይም ፓስፖርት ዋናዉን እና ኮፒ በክላሰር ማቅረብ አለበት፡፡    "], 
                                      },
      en: { title: "Birth Registration", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office", 
        preConditions: ["If the parents of the child are both alive or unable to register the birth due to force majeure, they can register the birth by giving a special birth proxy to the child's biological mother, and if the child's biological mother is unable to register the birth, by giving a special birth proxy to the child's biological father.", 
                      "If one of the parents is not alive, the birth is registered when the living parent presents the legal death certificate of the deceased parent.",
                      "Persons with disabilities can register through their caregivers or guardians.",
                      "A birth is registered for a live birth or a live birth followed by immediate death, but a stillbirth is not registered.",
                      "A birth registration service seeker who is 18 years of age or older must register their birth themselves.",
                      "When parents who have a child before the age of 18 come to register their child's birth, they can register the child's birth by submitting a letter of support from the lower administration office where they live",
                      "Birth If the registrant is a foreigner, he must have been born in Ethiopia.",
                      "A birth registrant who is 18 years of age and above fills in the information in the parent's field, and then marks the parent's signature with a hyphen (-)"],  
        requirements: ["If the birth occurred at a health facility, the registrant must submit a birth notification form from the health facility.", 
                       "When the guardian or guardian of the child comes to register the birth, they must provide a legal proof of guardianship or guardianship issued by the court.",
                      "The police or appropriate government agency that comes to register an abandoned child must provide legal identification or proof of identity.",
                    "If the birth registrant is a foreign citizen, proof from a health institution must be submitted."],  }
    },
    marriage: {
      am: { title: "የጋብቻ ምዝገባ", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት", 
      preConditions: ["ተጋቢዎች ጋብቻ ለመፈፀም ማሰባቸውን እጅግ ቢዘገይ ጋብቻቸውን  ለመፈፀም  ከወሰኑበት ቀን ከአንድ  ወር በፊት ለክብር መዝገብ ሹሙ  ማስታወቅ አለባቸው፡፡ ሆኖም ይህ ድንጋጌ  በሃይማኖታዊ እና  ባህላዊ ስርዓት የሚፈፀም ጋብቻን   አይመለከትም፡፡", 
                    "የክብር መዝገብ ሹሙ ጥያቄው በቀረበለት ቀን ከተጋቢዎቹ ጋር በመነጋገር ከወሰነ በኃላ በማግስቱ  ጋብቻው የሚፈፀምበትን ቀን በመግለጽ አመቺ በሆነው መንገድ ለ15 ተከታታይ  ቀን የሚቆይ   ማስታወቂያ ያወጣል፡፡   ",
                    "ማስታወቂያ ከተለጠፈበት ቀን ጀምሮ ባሉት ተከታታይ 15 ቀናት ውስጥ የጋብቻ መቃወሚያ  በጽሁፍ መቅረብ አለበት፤ መቃወሚያ ሊያቀርቡ የሚችሉ ወላጆችና  ተወላጆች፣ አቃቤ ሕግ፣ አሳዳሪ ወይም የቀደመ ጋብቻ አለኝ የሚል ሰው  መሆን አለበት፡፡",
                    "የክብር መዝገብ ሹሙ በቀረበው የጋብቻ መቃወሚያ ላይ በአምስት ተከታታይ ቀናት ውስጥ ውሳኔ በመስጠት ማሳወቅ አለበት፡፡",
                    "ወንደም ሆነ ሴቷ 18 ዓመት ሳይሞላቸው ጋብቻ መፈፀም አይችለም፡፡",
                    "ከባድ ምክንያት ሲያጋጥም ተጋቢዎቹ ወይም ከተጋቢዎቹ የአንዳቸዉ ወላጆች ወይም አሳዳሪ በሚያቀርቡት ጥያቄ መሰረት ጠቅላይ አቃቤ ህጉ ከመደበኛ የጋብቻ ዕድሜ ከሁለት ዓመት ያልበለጠ ጊዜ በመቀነስ እንዲጋቡ መፍቀድ ይችላል፡፡",
                    "ተጋቢዎች በፍርድ ቤት እንዳይጋቡ የተከለከሉ መሆናቸውን የሚገልጽ የጽሁፍ ማስረጃ የተገኘ እንደሆነ የክብር መዝገብ ሹሙ ጋብቻውን አይመዘግብም፡፡ ",
                    "በባህል ስርአት መሰረት የሚፈፀም ጋብቻ አንድ ወንድ እና አንድ ሴት በሚኖሩበት አከባቢ ባህል ወይም በሁለቱ ተጋቢዎች ወይም ከሁለቱ ተጋቢዎች በአንዳቸው ባህል መሰረት የተፈፀመ መሆን አለበት፡፡",
                    "አንዲት ሴት በብቸኝነት ለመኖር በህግ የተወሰነው ጊዜ ሳያልፍ ከሌላ ወንድ ጋር ጋብቻ መፈፀም አትችልም፡፡",
                    "የሚፀና ጋብቻ ተፈፀመ የሚባለው ተጋቢዎቹ ለመጋባት ነፃና ሙሉ ፍቃዳቸውን ሲሰጡ ብቻ ነው ፡፡",
                    "በሙሽራው በኩል 2 በሙሽሪት በኩል 2 በድምሩ 4 ምስክሮች መቅረብ አለባቸው፡፡",], 
        requirements: ["ተጋቢዎች  ጊዜው ያላለፈበት የነዋሪነት ወይም ብሔራዊ መታወቂያ ወይም ፓስፖርት  ወይም የመከላከያ  ሰራዊት መታወቂያ  ወይም ስደተኛነቱን  የሚገልጽ ማስረጃ  ወይም የመኖሪያ ፈቃድ ወይም ከዝቅተኛው የአስተዳር ጽህፈት ቤት የተሰጠ የነዋሪነት ማስረጃ ወይም የኢትዮጵያ ተወላጅ የሆነ የውጭ ዜግነት መታወቂያ መቅረብ አለበት፡፡", 
                       "ጋብቻው  የሚፈፀመው በተጋቢ ወላጆች  ወይም በቅርብ ዘመዶች  መደበኛ መኖሪያ ቦታ ከሆነ የወላጆች ወይም የቅርብ ዘመዶች የነዋሪነት/ብሄራዊ መታወቂያ ወይም ከዝቅተኛው የአስተዳር ጽህፈት ቤት የተሰጠ የነዋሪነት ማስረጃ መቅረብ  አለበት፡፡",
                       "ካምፕ/ፕሮጄክት በሚገኝበት አስተዳደር  ጽ/ቤት መደበኛ ነዋሪነት መታወቂያ የሌላቸዉ ጋብቻ አስመዝጋቢዎች ጋብቻን ማስመዘገብ ሲፈልጉ ካምፑ/ ፕሮጄክቱ/ፋብሪካው የምዝገባ ጽ/ቤቱ በሚገኝበት አስተዳደር ጽ/ቤት አካባቢ መሆኑን በማረጋገጥና ተመዝጋቢዎቹ/አስመዝጋቢዎቹ የካምፑ/የፕሮጄክቱ/ የፋብሪካው  ሰራተኛ መሆናቸውን የሚገልጽ ማስረጃ ሲያቀርቡ  መመዝገብ ይችላሉ፡፡",
                       "የተጋቢ ምስክሮች አገልግሎቱ ያላለፈበት  የነዋሪነት/ብሄራዊ ወይም ፓስፖርት ወይም የመከላከያ ሰራዊት መታወቂያ ወይም ማንነታቸውን  የሚገልጽ ማስረጃ  መቅረብ  አለበት፡፡",
                       "ሙሽራው/ዋ ከዚህ በፊት አግብቶ/ታ የፈታ/ች ከሆነ የፍቺ ምስክር  ወረቀት ካለ   መቅረብ  አለበት፡፡",
                       "ከ 6 ወር ወዲህ በተመሳሳይ  ጊዜ የተነሱት ሁለት ሁለት 3 በ 4 የሆነ  የተጋቢዎች  ፎቶ-ግራፍ መቅረብ አለበት፡፡",
                       "በሃይማኖታዊ   እና ባህላዊ ስርዓት  የተፈፀመ  ጋብቻ የተጋቢዎች  ምስክሮች  ወይም በጋብቻ  ስርዓቱ  ላይ የታደመ ሰው በክብር  መዝገብ ሹሙ ፊት በአካል  ቀርበው  ፊርማቸውን  ማኖር  አለባቸው፡፡ ",
                       "የተጋቢዎች  የልደት ምስክር ወረቀት ካለ  መቅረብ  አለበት፡፡",]},
      en: { title: "Marriage Registration", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office",
     preConditions: ["If the couple decides to get married too late, they must notify the registrar one month before the date they decide to get married. However, this provision does not apply to religious and traditional marriages.", 
            "The registrar of honor, after talking to the couple on the day of the question and deciding, the next day he will issue a notice for 15 consecutive days stating the date of the marriage.",
            "Objection to marriage must be submitted in writing within 15 consecutive days from the date of posting of notice; It must be parents and descendants, prosecutors, guardians or a person who claims to have a previous marriage who can file an objection.",
            "The registrar must give a decision on the marriage objection submitted within five consecutive days.",
            "Neither a man nor a woman can get married before they reach 18 years of age.",
            "When serious cause occurs, the Attorney General may allow them to marry by reducing a period of not more than two years from the regular marriage age based on the request submitted by the couple or one of the parents or guardian.",
            "If written evidence is found that the spouses are prohibited from marrying by the court, the registrar will not register the marriage.",
            "Marriage performed according to the cultural system must be performed according to the culture of the area where one man and one woman live or according to the culture of the two spouses or one of the two spouses.",
            "A woman cannot marry another man before the period legally determined for her to live in solitude passes.",
            "A valid marriage is said to have been performed only when the spouses give their free and full consent to marry.",
            "A total of 4 witnesses must be provided: 2 on the groom's side and 2 on the bride's side.",], 
         requirements: ["Spouses must present an unexpired residence or national ID or passport or defense army ID or proof of immigration or residence permit or proof of residency issued by the lowest administrative office or a foreign citizen ID of Ethiopian origin.", 
            "If the marriage is performed at the place of normal residence of the spouse's parents or close relatives, the residence/national ID of the parents or close relatives or proof of residency issued by the lowest registry office must be submitted.",
            "When marriage registrants who do not have a regular residence ID at the administrative office where the camp/project/factory is located want to register a marriage, they can register by confirming that the camp/project/factory is in the area of the registration office and when the registrants provide proof that they are employees of the camp/project/factory.",
            "Proof of residence/nationality or passport or Defense Force ID or proof of identity of spouse witnesses must be provided.",
            "If the bride or groom was previously married and divorced, a divorce certificate should be provided if available.",
            "Two 3 by 4 photographs of the couple taken at the same time within 6 months must be submitted.",
            "Witnesses of couples who have been married in a religious and traditional ceremony or a person who has attended the marriage ceremony must appear in person in front of the registrar and sign their signatures.",
            "Birth certificates of spouses, if available, must be submitted."] }
    },
    death: {
      am: { title: "የሞት ምዝገባ", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት", 
         preConditions: ["ከሟች ጋር አብሮ ይኖር የነበረ ሰው፣ አብሮ ይኖር የነበረ ሰው የሌለ እንደሆነ የሟች የስጋ ወይም የጋብቻ ዘመዶች፣ እነዚህ የሌሉ እንደሆነ የቅርብ ጎረቤት ወይም ስለሟቹ መሞት የሚያውቅ ማንኛውም ሰው ሟች መሞቱን ማስመዝገብ አለበት፡፡", 
            "ሞቱ የተከሰተው በጋራ መኖሪያ ስፍራ ከሆነ የተቋሙ ሃላፊ ሞቱን ለማስመዝግብ መቅረብ አለበት፡፡",
            "በአደጋ ምክንያት ከሞቱ ሰዎችና አደጋው ከደረሰባቸው ተጎጂዎች ጋር አብሮ የነበረ ሰው ሊገኝ አለመቻሉን ካጣራ አካል የተሰጠ ማስረጃ ሲቀርብ ሞቱ ይመዘገባል፡፡",
            "ሞቱ የሚመዘገበው በግለሰቡ መጥፋት ውሳኔ ምክንያት ከሆነ የፍርድ ቤት ውሳኔ ትክክለኛ ቅጂ መቅረብ አለበት፡፡",
            "የጊዜ ገደቡ ባለፈ ምዝገባ ለሚመዘገብ ሞት ስለሞቱ መከሰት የሚገልፅ የተረጋገጠ የፅሑፍ ማስረጃ መቅረብ አለበት፡፡ ማስረጃው የሚቀርበው ከእድር፣ ከቤተክርስቲያን፣ ከመስጊድ እና ከመሳሰሉት ይሆናል፡፡"], 
           requirements: ["የሟች የነዋሪነት ወይም ብሄራዊ መታወቂያ ወይም ፓስፖርት ወይም ስደተኛነቱን የሚገልጽ ማስረጃ ወይም የመኖሪያ ፍቃድ ካለ መቅረብ አለበት፡፡", 
            "አስመዝጋቢው ጊዜው ያላለፈበት ማንነቱን የሚገልጽ መታወቂያ ማቅረብ አለበት፡፡",
            "ሞቱን የሚያስመዘግበው ፖሊስ ማንነቱን የሚገልጽ መታወቂያ/ማስረጃ ማቅረብ አለበት፡፡",
            "ሞቱ የሚመዘገበው በግለሰቡ መጥፋት ውሳኔ ምክንያት ከሆነ የፍርድ ቤት ውሳኔ ትክክለኛ ቅጂ መቅረብ አለበት፡፡",
            "የጊዜ ገደቡ ላለፈ የሞት ምዝገባ ስለሞቱ መከሰት የሚገልፅ የፅሑፍ ማስረጃ መቅረብ አለበት፡፡",
            "ሞቱ የተከሰተው በውጭ አገር ዜጋ ላይ ከሆነ ከጤና ተቋም የተሰጠ የሞት ማሳወቂያ ወረቀት ወይም ማስረጃ መቅረብ አለበት፡፡"] },
      en: { title: "Death Registration", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office",
         preConditions: ["A person who was living with the deceased, or if there is no person who was living with the deceased, the blood or marriage relatives of the deceased, or if these are not available, a close neighbor or any person who knows about the death of the deceased must register the death.", 
            "If the death occurred in a communal residence, the head of the institution must appear to register the death.",
            "Death will be registered when evidence is presented from the body that investigated that the person who was with the victims of the accident could not be found.",
            "If the death is registered due to a decision on the disappearance of the individual, a correct copy of the court decision must be submitted.",
            "For a death registered after the time limit has passed, certified written evidence describing the occurrence of the death must be submitted. The evidence shall be submitted from Edir, Church, Mosque, and the like."], 
         requirements: ["The deceased's residence or national ID or passport or proof of immigration or residence permit must be submitted if available.", 
            "The registrant must provide an unexpired identification card that identifies their identity.",
            "The police who register the death must provide an ID/evidence identifying their identity.",
            "If the death is registered due to a decision on the disappearance of the individual, a correct copy of the court decision must be submitted.",
            "For late death registration, written evidence describing the occurrence of the death must be submitted.",
            "If the death occurred to a foreign citizen, a death notification paper or evidence issued from a health facility must be submitted."]}
    },
    divorce: {
      am: { title: "የፍቺ ምዝገባ", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት",
         preConditions: ["የጠያቂው የታደሰ መታወቂያ ወይም ፓስፖርት እና ቪዛ ወይም የመኖሪያ ፈቃድ መቅረብ አለበት፡፡", 
            "የፍርድ ቤት የፍቺ ውሳኔ  ገቢ ካልተደረገ ዋናውን እና ኮፒው መቅረብ አለበት፡፡",
            "የኢምባሲ ማረጋገጫ ሲሆን ከኢንባሲው ስለጉዳዩ የሚገልጽ ደብዳቤ እና የኢምባሲው ተወካይ የታደሰ መታወቂያ ወይም ፓስፖርት እና ቪዛ ወይም የመኖሪያ ፈቃድ ማቅረብ አለባቸው፡፡",
            "ጥያቄው በውክልና ከሆነ ስለጉዳዩ በግልጽ የሚያሳይ ልዩ (Specific) ህጋዊ የውክልና ማስረጃ መቅረብ አለበት የወካይ እና የተወካይ በዘመኑ የታደሰና ሙሉ መረጃ የያዘ መታወቂያ ወይም ፓስፖርት (የወካይ ኮፒ፣ የተወካይ ዋናውንና ኮፒ) መቅረብ አለበት፡፡ ጥያቄው ከውጭ ሃገር ከሆነ የታደሰ ፓስፖርት፣ ዜግነቱን የሚገልጽ የመኖሪያ ፈቃድ ወይም የስደተኞች መታወቂያ (የተወካይ ዋናውንና ኮፒ፣ የወካይ ኮፒ) መቅረብ አለበት፡፡ ለእርማት ለሚቀርቡ ጥያቄዎች በፍርድ ቤት የተሰጠ ውሳኔ መቅረብ አለበት፡፡"],
          requirements: ["ፍቺው ሥልጣን ባለው ፍርድ ቤት የተከናወነ መሆኑን የሚገልጽ የፍርድ ቤት ውሳኔ ግልባጭ መቅረብ አለበት፡፡", 
            "ፍቺው የሚመዘገበው በወኪል ከሆነ የፍቺ ልዩ ውክልና ማስረጃ መቅረብ አለበት፡፡",
            "ቀደም ሲል የጋብቻ ምስክር ወረቀት የተሰጠ ከሆነ የተሰጠው የጋብቻ ምስክር ወረቀት መመለስ አለበት፡፡"] },
      en: { title: "Divorce Registration", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office", 
        preConditions: ["The applicant's renewed ID or passport and visa or residence permit must be provided.", 
            "If the court's divorce decision has not been submitted  the original and its copy must be presented.",
            "In case of embassy confirmation, a letter from the embassy describing the matter and the embassy representative's renewed ID or passport and visa or residence permit must be provided.", 
            "If the request is by proxy, a legal special (Specific) power of attorney that clearly shows the matter must be presented. Renewed ID or passport containing full information of the principal and the agent (copy for the principal, original and copy for the agent) must be provided. If the request is from abroad, a renewed passport, a residence permit stating nationality, or a refugee ID (original and copy for the agent, copy for the principal) must be provided. For requests submitted for correction, a decision given by the court must be presented."],
         requirements: ["A copy of the court decision stating that the divorce was performed in a court of competent jurisdiction must be submitted.", 
            "If the divorce is registered by an agent, a special power of attorney for divorce must be submitted.",
            "If a marriage certificate was previously issued, the issued marriage certificate must be returned."]}
    },
    adoption: {
      am: { title: "የጉዲፈቻ ምዝገባ", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት",
         preConditions: ["ጉዲፈቻ አድራጊዎች ባለትዳር ከሆኑ የጉዲፈቻ ልጅ ስም ከጉዲፈቻ ውል ላይ የተፃፈው ስም የአባት ስም የጉዲፈቻ አድራጊው ስም ሲሆን የአያት ስም የጉዲፈቻ አድራጊው አባት ስም ይመዘገባል፡፡", 
            "ጉዲፈቻ አድራጊው ወንድ ከሆነ የጉዲፈቻ ልጅ ስም ከጉዲፈቻ ውል ላይ የተፃፈውን በመውሰድ የጉዲፈቻ አድራጊው ስም የጉዲፈቻ ተደራጊው ልጅ አባት ስም ሲሆን የጉዲፈቻ አድራጊው አባት ስም የጉዲፈቻ ተደራጊው ልጅ አያት ስም ሆኖ ይመዘገባል፡፡",
            "ጉዲፈቻ አድራጊዋ ሴት ከሆነች የጉዲፈቻ ልጅ ስም ከጉዲፈቻ ውል ላይ የተፃፈው ስም የአባት ስም የጉዲፈቻ አድራጊዋ አባት ስም እና የአያት ስም የጉዲፈቻ አድራጊዋ አያት ስም ይመዘገባል፡፡"],
             requirements: ["ጉዲፈቻ የተደረገው ልጅ የቀድሞ የልደት ምስክር ወረቀት ካለው ለምዝገባው ሂደት የሚያስፈልጉ መረጃዎች ከምስክር ወረቀቱ ከተወሰደ በኋላ ለክብር መዝገብ ሹሙ መመለስ አለበት፡፡", 
            "በፍርድ ቤት የፀደቀ የጉዲፈቻ ስምምነት ትክክለኛ ግልባጭ መቅረብ አለበት፡፡",
            "የጉዲፈቻ አድራጊዎች የጋብቻ ሁኔታ የሚገልጽ ማስረጃ መቅረብ አለበት፡፡"]},
      en: { title: "Adoption Registration", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office", 
        preConditions: ["If the adopters are a married couple, the child's name shall be the name written on the adoption contract, the father's name shall be the adopter's name, and the grandfather's name shall be the adopter's father's name.", 
            "If the adopter is a man, the child's name shall be taken from the adoption contract, the adopter's name shall be the child's father's name, and the adopter's father's name shall be the child's grandfather's name.",
            "If the adopter is a woman, the child's name shall be the name written on the adoption contract, the father's name shall be the adopter's father's name, and the grandfather's name shall be the adopter's grandfather's name."], 
        requirements: ["If the adopted child has a previous birth certificate, the information required for the registration process must be taken from the certificate and then the certificate must be returned to the registrar.", 
            "A correct copy of the adoption agreement approved by the court must be submitted.",
            "Evidence describing the marital status of the adopters must be submitted."]}
    },
    paternity_ack: {
      am: { title: "ልጅነትን መቀበል", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት", 
        preConditions: ["አባት የክብር መዝገብ ሹም ፊት ቀርቦ ልጄ ነው ብሎ ቃሉን መስጠት አለበት፡፡", 
            "በፍርድ ቤት የፀደቀ ኑዛዜ ሲቀርብና ከአባትየው ወላጆች አንዱ በወላጅ አባት ስም ልጁን ሲቀበሉ እና የልጁ እናት የተቀባዩን አባትነት አምና ስትቀበል ኩነቱ ይመዘገባል፡፡",
            "ልጁ ለአካለ መጠን የደረሰ የሆነ እንደሆነ አባት ልጁን የመቀበሉ ተግባር የሚመዘገበው ልጁ አባትነቱን የተቀበለ እንደሆነ ነው፡፡",
            "ወላጅ አባት አካለ መጠን ያልደረሰ ቢሆንም ልጄ ነው ሲል ቃል መስጠት የሚችለው አባት ብቻ ነው፡፡",
            "በወኪል አማካይነት ቃሉን የሚሰጥ ከሆነ በፍርድ ቤት የጸደቀ ልዩ የውክልና ማስረጃ መቅረብ አለበት፡፡",
            "የልጁ እናት የተቀባዩን አባትነት እውነትነት ያለው መሆኑን ካላመነች በስተቀር የክብር መዝገብ ሹሙ መመዝገብ የለበትም፡፡",
            "የክብር መዝገብ ሹሙ ልጅነትን መቀበልን ለመመዝገብ አባት ጥያቄ ካቀረበበት ቀን ጀምሮ ለ30 ተከታታይ ቀናት የሚቆይ ማስታወቂያ በመለጠፍ ክርክር ያልተነሳ እንደሆነ ኩነቱን ይመዘግባል፡፡",
            "የልጁ አባት የሞተ ወይም ፍቃዱን ለመስጠት የማይችል በሆነ ጊዜ ከአባትየው ወላጆች አንዱ በእርሱ ስም ልጄ ነው ሲል ለክብር መዝገብ ሹም ቃሉን ሊሰጥ ይችላል፡፡",
            "የልጁ እናት የሞተች ወይም ፍቃዷን ለመግለጽ የማትችል ሆና የተገኘች እንደሆነ የእምነት ቃሉን ከልጁ እናት ወላጆች በአንደኛው ሊሰጥ ይችላል፡፡",
            "የልጁ እናት ወላጆች በሌሉ ጊዜ ወደ ላይ በሚቆጠር ሌላ ወላጅ ወይም በፍርድ በተከለከለው ሰው አሳዳሪ የእምነት ቃሉ ሊሰጥ ይችላል፡፡",
            "ልጅነትን በክብር መዝገብ ሹም ፊት የሚቀበል ሰው ሲቀርብ ከቀረበበት ቀን አንስቶ እስከ 30 ቀን ውስጥ ባለው ጊዜ ውስጥ የእኔ ልጅ ነው የሚል ተቃዉሞ ካልቀረበ ምዝገባው ይከናወናል፡፡"],
         requirements: ["አንድ ሰው የክብር መዝገብ ሹም ፊት በመቅረብ አባት መሆኑን በመግለጽ በሚሰጠው ቃል ወይም በጽሁፍ በሚያደርገው ኑዛዜ ወይም በሌላ በማናቸውም ሥልጣን በተሰጠው ባለሥልጣን በተረጋገጠ ሰነድ አማካኝነት አባት መሆኑን ማስመዝገብ ይችላል፡፡"]},
      en: { title: "Acknowledgment of Paternity", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office", 
        preConditions: ["The father must appear before the registrar and give his word stating 'this is my child'.", 
            "When a court-approved will is presented and one of the father's parents accepts the child in the name of the biological father, and the child's mother acknowledges the paternity, the event shall be registered.",
            "If the child has reached the age of majority, the father's act of recognizing the child shall be registered only if the child accepts the paternity.",
            "Even if the biological father is a minor, only the father can give his word stating 'this is my child'.",
            "If the word is given through a proxy, a special power of attorney approved by the court must be submitted.",
            "The registrar shall not register the recognition unless the child's mother acknowledges the truth of the paternity.",
            "To register the recognition of a child, the registrar shall post a notice for 30 consecutive days from the date of the father's request, and if no dispute arises, the event shall be registered.",
            "If the child's father is deceased or unable to give his consent, one of the father's parents may give the word to the registrar in his name.",
            "If the child's mother is deceased or unable to express her consent, the word of acknowledgment can be given by one of the mother's parents.",
            "In the absence of the mother's parents, the acknowledgment can be given by another ascendant or the guardian of a person legally prohibited.",
            "When a person appears to recognize a child before the registrar, the registration shall be carried out if no objection claiming 'this is my child' is presented within 30 days from the date of application."], 
        requirements: ["A person can register his paternity by appearing before the registrar and giving his word, or through a written will, or by any other document certified by a competent authority."]}
    },
    paternity_court: {
      am: { title: "አባትነትን በፍርድ ቤት", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት",
         preConditions: ["የህፃኑ ልደት ተመዝግቦ የነበረ ከሆነ የአባትነትን በፍርድ ቤት ማወቅ ውሳኔን መሠረት አድርጎ የህፃኑ ወላጅ አባትና አያት በሚመለከት ቀድሞ የተመዘገበው መረጃ በፍርድ ቤት ውሳኔ መሰረት ይመዘገባል፡፡ (Unknown father regn).", 
            "የህፃኑ ልደት ቀደም ሲል በክብር መዝገብ ያልተመዘገበ ከሆነ ልደቱ በልደት አመዘጋገብ መመሪያ መሰረት ይመዘገባል፡፡"],
         requirements: ["የአስመዝጋቢው የነዋሪነት/ብሔራዊ መታወቂያ ወይም ፓስፖርት ይዞ መቅረብ አለበት፡፡", 
            "አስመዝጋቢ የፍርድ ቤት ውሳኔ ይዞ መቅረብ አለበት፡፡"]},
      en: { title: "Judicial Paternity", office: "🏛️ Woreda 08 Civil Registration and Residency Services Office",
         preConditions: ["If the child's birth was already registered, based on the court's decision of judicial declaration of paternity, the previously registered information regarding the child's father and grandfather will be recorded according to the court's decision. (Unknown father regn).", 
            "If the child's birth was not previously registered in the civil status register, the birth shall be registered according to the birth registration guidelines."],
          requirements: ["The registrant must appear with a residence/national ID or passport.", 
            "The registrant must provide the court's decision."]}
    },
    id_new: {
      am: { 
        title: "የመታወቂያ አገልግሎት", 
        office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት", 
        preConditions: [
            "ማንኛዉም በነዋሪነት የተመዘገበ ሰው መታወቂያ ለማግኘት የሚከተሉትን መስፈርቶች ማሟላት ይኖርበታል፡-",
            "ሀ. በነዋሪነት መመዝገቢያ ቅፅ 001 ላይ የተመዘገበ መሆን አለበት፤",
            "ለ. እድሜዉ 18 ዓመት እና ከዛ በላይ መሆን አለበት እንዱሁም፤",
            "ሐ. በአካል መቅረብ አለበት ወይም ኤጀንሲዉ ባቀረበዉ የቴክኖልጂ አማራጭ ማመልከት አለበት፤"
        ], 
        requirements: [
          "<b>1.<b/> ሀ. አንድ ተመዝጋቢ በዚህ መመሪያ መሠረት አግባብነት ካለው የነዋሪ መመዝገቢያ ቅጽ 001 በተጨማሪ በተዘጋጀው የተቋሙ የነዋሪነት መመዝገቢያ ሲስተም ላይ የባዮሜትሪክ እና የዲሞግራፊክ መረጃ በመስጠት በወረዳ ጽ/ቤት የሚመዘገብ ይሆናል፤",
        "ሐ. እድሜው ከ18 ዓመት በላይ የሆነ ሰው በመመዝገቢያ ሲስተም ሲመዘገብ የባዮሜትሪክ መረጃ መሰጠት አለበት፡፡ መረጃዎቹን መውሰድ ካልተቻለ ያልተቻለበት ምክንያት ተገልጾ በሶስት ምስክሮች እና በቃለ-መሀላ ተረጋግጦ የመታወቂያ እና ሌሎች የነዋሪነት አገልግሎት ማስረጃዎች በክ/ከተማ ፈቃድ ሲያገኝ በማኑዋል እንዲሰጠው ይደረጋል፤",
        "መ. በሁሉም የከተማው ወረዳዎች የሚገኙ የነዋሪነት ምዝገባ በዲጂታል ሆኖ በመረጃ መረብ የተያያዙ ይሆናሉ፤",
        "ሠ. አንድ ሰው በዲጂታል ለመመዝገብ ሲቀርብ በሚሰጠው መረጃ መሠረት በከተማው ክልል ውስጥ በሌላ ወረዳ የተመዘገበ መሆኑ ከተረጋገጠ በመጀመሪያ ከተመዘገበበት ወረዳ መልቀቁን የሚገልጽ የመልቀቂያ ደብዳቤ እስካላቀረበ ድረስ መመዝገብ አይችልም፤",
        "ረ. የህመም ወይም ሌላ አሳማኝ ምክንያት አስካላቀረበ ድረስ ማንኛውም ነዋሪ በዲጂታል ለመመዝገብ በአካል መቅረብ ያለበት ሲሆን አሳማኝ ምክንያት ቀርቦ ሲገኝ በክፍለ ከተማ ጽህፈት ቤት ወይም በተቋሙ ልዩ ውሳኔ በተንቀሳቃሽ መሳሪያ ምዝገባ የሚከናወን ይሆናል፤",
        "ሰ. የዲጂታል የነዋሪነት ምዝገባ ከተከናወነ በኋላ ለተመዝጋቢው የምዝገባ ማረጋገጫ ማስረጃ የጽ/ቤቱ ህጋዊ ማህተም አርፎበት መሰጠት አለበት፡፡ ማረጋገጫው የተመዝጋቢውን ፎቶግራፍ፣ የግል መረጃዎች እና አስር ዲጂት ያለው የምዝገባ መለያ ቁጥር የያዘ ነው፤",
        "ሸ. የዲጂታል የነዋሪነት ማረጋገጫው የመታወቂያ አገልግሎት ለማግኘት እድሜያቸው ለደረሱ የመታወቂያ ካርዱ ታትሞ እጃቸው እስኪደርስ እንደ መታወቂያ ያገለግላል፡፡",
        "ቀ. በዲጂታል ምዝገባ ወቅት የጋብቻ ሁኔታቸውን 'ያገባ' ወይም 'ያገባች' ብለው አስመዝግበው የነበሩ ነዋሪዎች በምዝገባ ወቅት 'ስለ ትዳር አጋራቸው ሙሉ መረጃ ሰጥተው ካስመዘገቡ በኋላ መረጃው በስህተት የተሞላ መረጃ ነው' በማለት ከዚህ በፊት ምንም አይነት ጋብቻ የሌላቸው ወይም እንደ ባል እና ሚስት አብረው እየኖሩ ያሉ እንጂ በተሻሻለው የፌዴራል የቤተሰብ ህግ ወይም በክልል የቤተሰብ ህግ እውቅና በተሰጠው የጋብቻ ስርዓት የተከናወነ ጋብቻ የሌላቸው መሆኑን በማስረዳት 'የጋብቻ ሁኔታዬ ያላገባ ሆኖ ይስተካከልልኝ' በሚል ጥያቄ የሚያቀርቡ ነዋሪዎች ቀድሞ በቤተሰብ ማህደራቸው ላይ የተመዘገበው መረጃቸው ያላገባ/ች የሚል ሆኖ ሳለ በዲጂታል ምዝገባ ወቅት 'ያገባ/ች' ተብሎ ተመዝግቦ የተፈጠረ ስህተት ወይም ሌላ በቂ አሳማኝ ስህተት ተፈጽሞ ካልሆነ በስተቀር ተገልጋዮች :-",
        "<b>I.<b/> ፍቺ ፈጽመው ከሆነና የፍቺ ማስረጃ በማቅረብ ወይም",
        "<b>II.<b/> የትዳር አጋር የመጥፋት የፍርድ ቤት ውሳኔ በማቅረብ ወይም",
        "<b>III.<b/> የትዳር አጋር ስለመሞቱ የሞት ማስረጃ በማቅረብ ወይም ሌላ አሳማኝ ማስረጃ ወይም የፍርድ ቤት ውሳኔ ሳያቀርቡ የጋብቻ ሁኔታ ወደ 'ያላገባ/ች' መቀየር አይቻልም፡፡",
            "<b>2.<b/> መታወቂያ ኢትዮጵያዊ የከተማዉ ነዋሪ ለሆነ ተመዝጋቢ ብቻ በካርድ ወይም በሌላ የቴክኖልጂ አማራጮች የሚሰጥ የነዋሪነት ማረገጋጫ ነዉ፤",
            "<b>3.<b/> እድሜው 18 ዓመት እና ከዚያ በላይ የሆነው ኢትዮጵያዊ በሚኖርበት ወረዳ በነዋሪነት ቅጽ 001 ላይ  የተመዘገበ ሰው ስለማንነቱ የሚገልጽ መታወቂያ እንዲሰጠው የመጠየቅ መብት አለው፤",
            "<b>4.<b/> በዚህ አንቀጽ ንኡስ አንቀጽ (3) መሠረት ጥያቄ የሚያቀርብ ሰው በወረዳው ጽ/ቤት በአካል ቀርቦ ከ6 ወር ወዲህ የተነሳውን 2 ጉርድ ፍቶግራፍ በመያዝና የተዘጋጀውን አገልግሎት መጠየቂያ ቅፅ በመሙላት አገልግሎቱን ያገኛሉ፤",
            "<b>5.<b/> መታወቂያ በውክልና አይሰጥም፤ አይታደስም፤",
            "<b>6.<b/> መታወቂያ የተሰጠው ነዋሪ መታወቂያው የሚያስገኘውን መብትና ጥቅም ያገኛል፤",
            "<b>7.<b/> በነዋሪነት ተመዘግቦ በውጭ ሀገር ሲኖር የነበረ ዜግነቱን ያልቀየረ ኢትዮጵያዊ በዚህ የነዋሪነት ምዝገባ ቅፅ 001 መመሪያ አንቀፅ 6 የተገለፁትን ሲያሟላ መታወቂያ ይሰጠዋል፤",
            "<b>8.<b/> ተመዝጋቢዉ ቀድሞ ከሚኖርበት መልቀቂያ የሚያቀርብ ነዋሪ መታወቂያ በሚጠይቅበት ወረዳ የነዋሪነት ምዝገባ ቅፅ ውስጥ መልቀቂያዉ ለ3 ወራት ተመዝግቦ ከተቀመጠ በኋላ በነዋሪነት ሲመዘገብ መታወቂያ እንዲሰጠው የመጠየቅ መብት አለው፡፡ ጽ/ቤቱ ተመዝጋቢዉ በነዋሪነት ለመመዝገብ የቆይታ ጊዜውን እየጠበቀ መሆኑን የሚገልፅ ማረጋገጫ ማስረጃም በጽ/ቤቱ ህጋዊ ማህተም አረጋግጦ ለተመዝጋቢዉ መስጠት አለበት፤",
            "<b>9.<b/> የነዋሪነት ምዝገባ ቅፅ 001 መመሪያ መሰረት አንቀጽ 3 የተደነገገው እንደተጠበቀ ሆኖ በመመሪያው አንቀፅ 1 (መ) መሰረት ተመዝጋቢዎች መልቀቂያቸው ሶስት ወር ሳይጠብቅ በነዋሪነት ተመዝግበዉ መታወቂያ አገልግሎት ያገኛሉ፤"
        ,"<b>10.<b/>በሰነድ አልባ ባለ ይዞታዎች የተያዘ ይዞታ መብት የሚፈጠርለት መሆኑ ከወረዲዉ የመሬት ይዞት እና ማረጋገጫ ጽ/ቤት ሲገለፅና በወረዳው የሚኖሩ መሆናቸው ተረጋግጦ የነዋሪነት ምዝገባ ሲያከናዉኑ የመታወቂያ አገልግሎት ማግኘት ይችላሉ፡፡ ነገር ግን ከሚመለከተው አካል የህገ-ወጥ ይዞታ ባለቤት ሆነው ከተገኙ አግባብ ባለው አካል ከተገለፀበት ቀን ጀምሮ የመታወቂያ አገልግሎት አይሰጥም፡፡ እድሳትም አይደረግም፡፡",
        
            "<b>ሀ.<b/> በዚህ መመሪያ መሠረት መታወቂያ የተሰጠው ማንኛውም ነዋሪ መታወቂያ እስከ አራት ዓመት ድረስ ያገለግላል፡፡ የአገልግሎት ዘመኑ ሲያበቃ ተመላሽ ተደርጎ አዲስ መታወቂያ ይሰጠዋል፤",
            "<b>ለ.<b/> መታወቂያ የተቀደደበት፣ የተቃጠለበት፣ የተበላሸበት ወይም በሌላ ተመሳሳይ ምክንያት ከጥቅም ውጭ የሆነበት ነዋሪ ወዲያውኑ ለሰጠው ወረዳ ጽ/ቤት በጽሁፍ ሲያመለክት በነዋሪነት ስለ መመዝገቡ እና ቀደም ብሎ መታወቂያው ስለ መውሰዱ በማረጋገጥ ምትክ መታወቂያ ይሰጠዋል፤",
            "<b>ሐ.<b/> መታወቂያ የጠፋበት ነዋሪ በወረዳው ጽ/ቤት ቀርቦ የቀድሞ መታወቂያዉን መረጃዎች ጠቅሶ በማመልከት ነዋሪ ስለመሆኑ በስራ-አስኪያጁ ሲረጋገጥ ነዋሪ መሆኑ ለሚመለከተዉ የፖሉስ ጣቢያ ተጽፎለት በሚያቀርበው የፖሉስ ጣቢያ ማስረጃ በምትኩ አዲስ መታወቂያ ይሰጠዋል፤",
            "<b>መ.<b/> ማንኛውም በዚህ መመሪያ መታወቂያ የተሰጠው ነዋሪ የመታወቂያ አገልግሎት ዘመኑ ሲያበቃ በጽ/ቤቱ በአካል በመቅረብ መታወቂያውን ማደስ አለበት፤",
            "<b>ሠ.<b/> በዚህ ንዐስ አንቀጽ (መ) የተደነገገዉ እንደተጠበቀ ሆኖ የዕድሳት ጊዜው ካለፈ እስከ 2 ወር ድረስ ያለ መቀጮ በአካል በጽ/ቤቱ ቀርቦ ማሳደስ ይችላል፡፡ ቀርቦ ሊያሳድስ ያልቻለበትን በቂ ምክንያት የሚያቀርብ ነዋሪ ምክንያቱ ከጤና ወይም ከማህበራዊ ችግር ጋር የሚገናኝ ሆኖ ሲገኝ ና የጽ/ቤቱ ስራ-አስኪያጅ ምክያቱን ሲያጸድቅ ቅጣቱ የሚነሳ ይሆናል፤",
            "<b>ረ.<b/> በዚህ ንዐስ አንቀጽ (ሠ) የተገለጸው እንደተጠበቀ ሆኖ አራት ዓመት ከ2 ወር ሲሞላው ያላደሰ ነዋሪ የተሰጠውን መታወቂያ በአካል በጽ/ቤቱ ቀርቦ በወረዳው እየኖረ ስለመሆኑ በቃለ-መሃላ ተረጋግጦ በመቀጮ ይታደስለታል፤",
            "<b>ሰ.<b/> በዚህ ንዐስ አንቀጽ (ረ) የተገለጸው እንደተጠበቀ ሆኖ የመታወቂያ የአገልግሎት ዘመኑ ካበቃ ከ2 ዓመት በላይ ከሆነ ኢትዮጵያ ውስጥ ከቆየበት ቦታ ስለ ቆይታው ማስረጃ ማቅረብ ይጠበቅበታል፡፡ ከኢትዮጵያ ውጭ የቆየ ከሆነ ዜግነቱን አለመቀየሩን የሚያረጋግጥ የታደሰ ፓስፖርት በማቅረብ በመቀጮ ይታደስለታል፤",
            "<b>ሸ.<b/> በዚህ ንዐስ አንቀጽ (ለ) እና (ሐ) ምትክ መታወቂያ የሚይዘው ቁጥር የቀድሞውን የምዝገባ እና የመታወቂያ ቁጥር ይሆናል፤",
            "<b>ቀ.<b/> ከዚህ በፊት በወረዳዉ አስተዳደር ዋና ስራ አስፈጻሚ አማካኝነት እየተረጋገጠ የቤት ቁጥር በሌለው ቅጽ ተከፍቶ የተሰጠ መታወቂያ አይታደስም፡፡ ነገር ግን መደበኛ የመኖሪያ አድራሻ ያለው በነዋሪነት የተመዘገበ አስመዝጋቢ ሲያቀርቡ የመልቀቂያ መረጃቸዉ በቃለ-መሃላ ተደራጅቶ መልቀቅያ እንዲሰጣቸዉ በማድረግ በነዋሪነት ተመዝግበው መታወቂያቸዉን ማደስ ይችላሉ፤",
            "<b>በ.<b/> የነዋሪነት ምዝገባ ቅፅ 001 መመሪያ መሰረት አንቀፅ (17) እና (18) የተመዘገቡ ነዋሪዎች መታወቂያ ለማሳደስ በሚመጡበት ወቅት በተቋሙ ውስጥ በቋሚነት ስለ መኖራቸው በደብዳቤ ማስረጃ ማቅረብ አለባቸው፤",
            "<b>ተ.<b/> የንግድ ቤቱና የመኖሪያ ቤቱ በአንድነት የሆኑና መታወቂያ የወሰደ ከቤቶች ልማት ጽ/ቤት ወይም ከግብር ከፋዩች ጽ/ቤት በሚያቀርቡት ማስረጃ መሰረት መታወቂያ ይታደስላቸዋል፡፡"
        ]
      },
      en: { 
        title: "ID Card Services", 
    office: "🏛️ Woreda 08 Civil Registration and Residency Services Office", 
    preConditions: [
        "Any person registered as a resident must fulfill the following criteria to obtain an ID card:",
        "ሀ. Must be registered on Resident Registration Form 001;",
        "ለ. Must be 18 years of age and above; and",
        "ሐ. Must appear in person or apply through the technological option provided by the agency;"
    ], 
    requirements: [
       "<b>1.</b> a. In addition to the appropriate Residency Registration Form 001 under this directive, a registrant shall be registered at the Woreda office by providing biometric and demographic information on the institution's residency registration system;",
      "c. Persons over 18 years of age must provide biometric data when registering on the system. If data collection is impossible, the reason shall be stated, verified by three witnesses and an oath, and manual ID/residency services will be provided upon approval from the Sub-City;",
      "d. Residency registration in all Woredas of the city shall be digital and networked via an information web;",
      "e. If a person applying for digital registration is found to be registered in another Woreda within the city, they cannot register unless they provide a clearance letter from the initial Woreda;",
      "f. Unless a medical or other convincing reason is provided, any resident must appear in person for digital registration. Upon presentation of a convincing reason, registration may be conducted via mobile devices through Sub-City or special institutional decision;",
      "g. After digital residency registration, a registration confirmation document with the office's legal seal must be issued. The confirmation includes the registrant's photo, personal data, and a ten-digit registration identification number;",
      "h. For those of age, the digital residency confirmation serves as a temporary ID until the printed ID card is delivered.",
      "i. Residents who registered their marital status as 'Married' and later request a change to 'Single'—claiming the information was erroneous or that they only cohabitate without a legal marriage under Federal or Regional Family Law—cannot change their status unless they provide:",
      "<b>I.</b> Evidence of divorce, or",
      "<b>II.</b> A court decision declaring the disappearance of the spouse, or",
      "<b>III.</b> Evidence of the spouse's death or other compelling legal evidence/court decisions.",
      "<b>2.</b> An ID card is a residency confirmation issued only to Ethiopian city residents via card or other technological options;",
      "<b>3.</b> Any Ethiopian aged 18 or older registered on Form 001 in their Woreda has the right to request an identification card;",
      "<b>4.</b> According to sub-article (3), applicants must appear in person at the Woreda office with 2 passport-sized photos taken within the last 6 months and fill out the service request form;",
      "<b>5.</b> ID cards shall not be issued or renewed by proxy (representation);",
      "<b>6.</b> A resident issued an ID card shall enjoy the rights and benefits provided by the ID;",
      "<b>7.</b> An Ethiopian who lived abroad without changing nationality and fulfills the requirements of Article 6 of Residency Form 001 directive shall be issued an ID card;",
      "<b>8.</b> A resident providing clearance from a previous location can request an ID after the clearance has been registered for 3 months. The office must issue a sealed confirmation that the resident is awaiting the completion of their residency duration;",
      "<b>9.</b> Notwithstanding Article 3 of the residency directive, registrants under Article 1(d) shall receive ID services without waiting for the three-month clearance period;",
      "<b>10.</b> Occupants of undocumented holdings shall receive ID services upon verification from the Woreda Land Holding and Information Office. However, if found to be an illegal holder by the relevant authority, ID services and renewals will be denied from the date of discovery.",
      "<b>a.</b> Any ID card issued under this directive is valid for up to four years. Upon expiry, it shall be returned and a new ID issued;",
      "<b>b.</b> A resident whose ID is torn, burned, damaged, or otherwise unusable may apply in writing for a replacement after verification of their registration;",
      "<b>c.</b> A resident who loses their ID must apply at the Woreda office citing previous details. Upon verification by the manager, a letter to the police station will be written, and a replacement issued based on the police report;",
      "<b>d.</b> Any resident must appear in person to renew their ID when the service period expires;",
      "<b>e.</b> Notwithstanding sub-article (d), a resident can renew within 2 months of expiry without a penalty. Penalties may be waived for health or social reasons approved by the office manager;",
      "<b>f.</b> A resident failing to renew within 4 years and 2 months must appear in person and verify their residency by oath to renew with a penalty;",
      "<b>g.</b> If the ID has been expired for over 2 years, the resident must provide evidence of their whereabouts within Ethiopia. If abroad, they must present a renewed passport proving they haven't changed nationality to renew with a penalty;",
      "<b>h.</b> Replacement IDs issued under sub-articles (b) and (c) shall retain the original registration and ID numbers;",
      "<b>i.</b> IDs previously issued on forms without house numbers (verified by the Woreda Chief Executive) shall not be renewed. However, if they present a registered house owner, they may register anew and renew their ID after organizing their clearance data via oath;",
      "<b>j.</b> Residents registered under Articles 17 and 18 of Form 001 must provide a letter from their institution confirming their permanent residency when applying for renewal;",
      "<b>k.</b> For those with combined business and residential addresses, IDs shall be renewed based on evidence provided from the Housing Development Office or the Taxpayers' Office."
    ]},
    },
   
    residency_registration: {
      am: {
        title: "የነዋሪነት ቅፅ 001 ላይ ምዝገባ",
        office: "🏛️ ወረዳ 08 የሲቪል ምዝገባና ነዋሪነት አገልግሎት ፅ/ቤት",
        preConditions: [
          "1. ማንኛውም በከተማ አስተዳደሩ ክልል ውስጥ የሚኖር ኢትዮጵያዊ ዜጋ እና በትውልድ ኢትዮጵያዊ በመደበኛ መኖሪያ ቦታው አካባቢ በሚገኝ የወረዳ ጽህፈት ቤት ቀርቦ በዚህ መመሪያ የተደነገጉ ቅድመ ሁኔታዎችን ሲያሟላ በነዋሪነት መመዝገብ ይችላል።",
          "ከ18 ዓመት በታች የሆኑ ልጆችን አባት ወይም እናት ወይም ሁለቱም ወይም ሞግዚት ወይም አሳዳጊ ወይም ህጋዊ ውክልና የተሰጠው ተወካይ በተወከለበት ቤት እንደ ባለቤቱ ሆኖ አዲስ የተወለዱ ህፃናትን እንዲሁም በቤቱ የሚያስተዳድሯቸውን ሰዎች በነዋሪነት ማስመዘገብ ይችላል።"
        ],
        requirements: [
          
          "<b>1. ተመዝጋቢዎች ማሟላት ያለባቸው መስፈርቶች፦</b>",
          "ሀ. ከሌላ የመኖሪያ ቦታ የመጣ ከሆነ ይኖርበት ከነበረው ቦታ ህጋዊ መልቀቂያ ማቅረብ አለበት፤",
          "ለ. መደበኛ የመኖሪያ ቦታ ያለው ወይም በሚመዘገብበት ቦታ በነዋሪነት የተመዘገበ አስመዝጋቢ ነዋሪ ማቅረብ መቻል ያለበት ሲሆን መልቀቂያው በአስመዝጋቢ ማህደር ውስጥ መመዝገብ እና መያያዝ አለበት፤",
          "ሐ. ከአዲስ አበባ ከተማ አስተዳደር ውጭ የሚኖርና መልቀቂያ ይዞ በመምጣት በነዋሪነት ለመመዝገብ ጥያቄ የሚያቀርብ ግለሰብ ጥያቄ ካቀረበበት ቀን ጀምሮ ለሶስት ወር እና ከዚያ በላይ በከተማ ውስጥ መቆየት አለበት፤",
          "መ. ከላይ በ (ሐ) የተደነገገው እንደተጠበቀ ሆኖ ከአቅም በላይ በሆነ ህመም ምክንያት፣ በትምህርት፣ በመንግስት የስራ ኃላፊነት ዝውውር፣ ከሁለት አንዳቸው የትዳር አጋር በከተማው ነዋሪነት ተመዝግበው ያሉ ተጋቢዎች ጥያቄ ሲያቀርቡ በማስረጃ በማረጋገጥ ተመዝጋቢዎቹ ሶስት ወር በከተማው መጠበቅ ሳይጠበቅባቸው በወረዳ ስራ-አስኪያጅ እየተረጋገጠ በነዋሪነት እንዲመዘገቡ ሊፈቀድ ይችላል፤",
          "ሠ. በዚህ አንቀጽ ንዑስ አንቀጽ (ሐ) የተገለጸው እንደተጠበቀ ሆኖ መልቀቂያ ማስረጃውን ለወረዳ ጽህፈት ቤት ካሳወቀበት ቀን ጀምሮ በቋሚነት ለመመዝገብ እየጠበቀ መሆኑን የሚገልጽ ለሶስት ወራት ያህል የሚያገለግል የደብዳቤ ማስረጃ ይሰጠዋል።"
        
          ,"<b>2. ማንኛውም ተመዝጋቢ የሚከተሉትን መረጃዎች ለምዝገባ አሟልቶ መቅረብ አለበት፦</b>",
          "ሀ. ሙሉ ስም እስከ አያት፤",
          "ለ. የእናት ሙሉ ስም፤",
          "ሐ. ጾታ፤",
          "መ. የትውልድ ቀን (ቀን፣ ወር፣ ዓመተ ምህረት)፤",
          "ሠ. የትውልድ ቦታ፣ ልዩ ቦታ፤",
          "ረ. ብሔር፤",
          "ሰ. ዜግነት፤",
          "ሸ. መደበኛ የመኖሪያ ቦታ፤",
          "ቀ. ጉርድ ፎቶግራፍ፤",
          "በ. የጋብቻ ሁኔታ፤",
          "ተ. የደም አይነት (አስገዳጅ ያልሆነ)፤",
          "ቸ. ሃይማኖት፤",
          "ነ. የትምህርት ደረጃ፤",
          "ኘ. የስራ ሁኔታ፤",
          "አ. የአስመዝጋቢው እና የተመዝጋቢው የስልክ ቁጥር"
        
          ,"<b>3. በነዋሪነት ለመመዝገብ የሚቀርብ ተመዝጋቢ በስራ ዝውውር የመጣ ከሆነ ከላይ ከተገለጸው መረጃ በተጨማሪ ቀድሞ ከሚኖርበት ቀበሌ/ወረዳ አስተዳደር የተሰጠው ስድስት ወር ያላለፈው መልቀቂያ ደብዳቤ ማቅረብ አለበት።</b>",
          "<b> 1.መልቀቂያው የሚከተሉትን መረጃዎች ማሟላት አለበት፦</b>",
          "ሀ. ሙሉ ስም እስከ አያት፤",
          "ለ. የእናት ሙሉ ስም፤",
          "ሐ. የጋብቻ ሁኔታ፤ ያገባ ከሆነና ልጆች ካሉት የባለቤቱ ስም ከነልጆቹ፣ እንዲሁም ሌሎች አብረውት የተሸኙ የቤተሰቡ አባላት ስም ዝርዝር፤",
          "መ. ዜግነት፤",
          "ሠ. የትውልድ ዘመን ቀን፣ ወር እና ዓመተ ምህረት፤",
          "ረ. የትውልድ ቦታ፤",
          "ሰ. ብሔር፤",
          "ሸ. ሃይማኖት፤",
          "ቀ. የትምህርት ሁኔታ፤",
          "በ. ቀን እና ቁጥር፤",
          "ተ. ከ18 ዓመት በላይ የሆኑ የቤተሰብ አባላት ካሉ ከ6 ወር ወዲህ የተነሱት ፎቶግራፍ (ከመሸኛው ጋር የተያያዘ)፤",
          "ቸ. የሰጠው ህጋዊ አካል ወይም ባለስልጣን ወይም ባለሙያ ሙሉ ስም እና የኃላፊነት ማዕረግ የተቋሙ ህጋዊ ማህተም ራስጌና ግርጌ ላይ ያረፈበት፤",
          "ነ. የተዛወረበት ምክንያት፤",
          "ኘ. ይኖር የነበረበትን አድራሻ ክልል፣ ዞን፣ ወረዳ፣ ቀበሌ እና የቤት ቁጥር፤",
          " በዚህ አንቀጽ (3) ንዑስ አንቀጽ (1) የተገለጸው እንደተጠበቀ ሆኖ በመሸኛው ላይ ከሀ፣ ለ፣ ሐ፣ በ፣ ተ፣ ነ በስተቀር ያልተሟሉ መረጃዎች ካሉ ሌሎች ህጋዊ መረጃዎች በማቅረብ ወይም በቃለ-መሃላ መረጋገጥ አለበት፤"
        
          ,"<b>4.<b/> በተለያዩ ምክንያቶች በነዋሪነት መመዝገቢያ ቅጽ ላይ ተመዝግቦ የሌለ የቤተሰብ አባል ያለ እንደሆነና አስመዝጋቢ ይህንኑ ጠቅሶ ሲያመለክት ተመዝጋቢው ስለ ማንነቱ የሚገልጽ በፎቶግራፍ የተደገፈ ከህጋዊ ተቋም የተሰጠ ማስረጃ ወይም የትምህርት ማስረጃዎችን በማቅረብ እና ቃለ-መሃላ በመፈጸም በዚህ አንቀጽ (2) መሰረት በነዋሪነት መመዝገብ የሚችል ሲሆን፤ ተመዝጋቢው 18 ዓመት ያልሞላው እንደሆነ አስመዝጋቢው ተመዝጋቢው በቤቱ የሚኖር የቤተሰብ አባል ስለመሆኑ በማረጋገጥ ቃለ-መሃላ የሚፈጽም ይሆናል።",
          "<b>5.<b/> በመመሪያው አንቀጽ 3 (ሐ) ላይ የተደነገገው እንደተጠበቀ ሆኖ ተመዝጋቢው መልቀቂያ ማቅረብ የማይችልበትን ከአቅም በላይ የሆነ ምክንያት ማለትም ከባድ የሆነ የተፈጥሮ ወይም ሰው ሰራሽ አደጋዎች በቀድሞ የነዋሪነት ስፍራው ደርሶ ከሆነና ከተረጋገጠ ወይም አካል ጉዳተኛ በመሆኑና ይህም ተንቀሳቅሶ ለማምጣት አስቸጋሪ ከሆነ በክፍለ ከተማ ለሚገኘው ጽህፈት ቤት ለውሳኔ በማቅረብ ተመዝጋቢው መልቀቂያ ማምጣት የማይችልበት አስገዳጅ ሁኔታ ስለ መፈጠሩ ቃለ-መሃላ በመፈጸም የግል መረጃው እንዲደራጅ በማድረግ በነዋሪነት አገልግሎት ቡድን መሪ ተረጋግጦ የጽህፈት ቤቱ ስራ-አስኪያጅ ሲያጸድቅ በነዋሪነት መመዝገብ ይችላል፤",
          "<b>6.<b/> በነዋሪነት ለምዝገባ የሚቀርበው ሰው በውጭ አገር ከሁለት ዓመት በላይ ቆይቶ በቋሚነት ለመኖር የመጣ እና ዜግነትን ያልቀየረ አመልካች ሆኖ ሲገኝ የሚከተሉትን መስፈርቶች ማሟላት አለበት፦",
          "ሀ. የታደሰ ፓስፖርት ወይም ሌሴ ፓስ (የይለፍ ሰነድ)፤",
          "ለ. በቋሚነት ተጠቃልሎ የመጣ መሆኑን የሚገልጽ ማስረጃ ከነበረበት ሀገር የኢትዮጵያ ኤምባሲ ወይም ሚሲዮን ወይም ከሀገር ውስጥ የውጭ ጉዳይ ቆንጽላ ጽህፈት ቤት ወይም አንድ በውጭ የቆየ ዜጋ ወደ ሀገር ጠቅልሎ ሲገባ እንዲያስገባ የተፈቀደለት የቀረጥ ነጻ የጉምሩክ የንብረት ማሳለፊያ ማስረጃ፤",
          "ሐ. የታደሰ ፓስፖርት ማቅረብ የማይችል ከሆነ ዜግነቱን ያልቀየረ ስለ መሆኑ ከኢሚግሬሽን እና ዜግነት አገልግሎት መረጃ ማቅረቡ ሲረጋገጥ ይመዘገባል።",
          
          "<b>7.<b/> ከመከላከያ ወይም ከፖሊስ ሰራዊት በክብር ተሰናባች አባላት የተሰጣቸውን በክብር መሰናበታቸውን የሚገልጽ ህጋዊ ማስረጃ እንደ መልቀቂያ ተቆጥሮላቸው በከተማው ያለ ካምፕ ፈቃድ ሲያገኙ ወይም በነዋሪነት ተመዝግቦ የሚያስመዘግባቸው ነዋሪ ሲኖር እንዲያቀርቡ በማድረግና የተጓደሉ የግል መረጃዎችን ቃለ-መሃላ አስፈጽሞ በማደራጀት በነዋሪነት ይመዘገባል።",
          "<b>8.<b/> በአንቀጽ 5 እና 6 ላይ በነዋሪነት ለመመዝገብ የተፈቀደለት ተመዝጋቢ ቀድሞ የነበረው ማንኛውም መታወቂያ በእጁ ላይ ካለ ለሚመዘገብበት ጽህፈት ቤት የሚያስረክብ ሲሆን፤ ቀድሞ ምንም ዓይነት መታወቂያ የሌለው ሆኖ ሲገኝ በቃለ-መሃላ በማረጋገጥ አገልግሎቱን ያገኛል፤",
          "<b>9.<b/> በትውልድ ኢትዮጵያዊ የሆኑ የውጭ ዜጎች በትውልድ ኢትዮጵያዊ ስለ መሆናቸው በትውልድ ኢትዮጵያዊ መታወቂያ ሲያቀርቡ በከተማው በነዋሪነት ተመዝግበው ከነዋሪነት መታወቂያ ውጭ ማንኛውንም አገልግሎት ማግኘት የሚችሉ ሲሆን፤ በአንቀጽ 3 ላይ የተደነገገው መስፈርት እንደተጠበቀ ሆኖ በየትኛውም የሀገሪቱ ክፍል በነዋሪነት ያልተመዘገቡ መሆናቸውን ቃለ-መሃላ የሚፈጽሙ ይሆናል።"
        
          ,"<b>10.<b/> የሚከተሉት አካላት በነዋሪነት ለመመዝገብ ጥያቄ የሚቀርብ ተመዝጋቢ ማስመዝገብ ይችላሉ፦",
          "ሀ. ማንኛውም በከተማዋ በነዋሪነት የተመዘገበ እና ቋሚ የመኖሪያ ቤት አድራሻ ያለው፤",
          "ለ. የፖሊስ እና መከላከያ ካምፕ፤ እንዲሁም",
          "ሐ. በመንግስት የተመዘገቡ በማህበራዊ ጉዳዮች በተለይም በጎዳና ተዳዳሪዎች መልሶ መቋቋም፣ በአረጋዊያን መንከባከብ፣ በአዕምሮ ህሙማን ድጋፍ እና ሌሎች ሰው ተኮር ስራ ላይ የተሰማሩ መንግስታዊ እና መንግስታዊ ያልሆኑ ድርጅቶች።",
          "<b>11.<b/> አስመዝጋቢዎች በፋይላቸው አስመዝገበው አገልግሎት እንዲያገኙ የፈቀዱለትን ነዋሪ አገልግሎት ከማግኘት እንዲታገድ ለማድረግ የመታወቂያው የአገልግሎት ዘመን እስከሚያበቃ መጠበቅ ሳያስፈልገው ጥያቄ በጽሁፍ ማቅረብ የሚችሉ ሲሆን፤ ጥያቄውን የማጽደቅ ኃላፊነት የጽህፈት ቤቱ ስራ አስኪያጅ ብቻ ይሆናል። ከቅጽ ላይ የታገደ ነዋሪ መታወቂያው የአገልግሎት ዘመኑ እስኪያበቃ ድረስ መታወቂያውን ተጠቅሞ ህገ-ወጥ ተግባር ይፈጽማል የሚል ጥርጣሬ ወይም መረጃ እስካልቀረበበት ድረስ የተሟላ አገልግሎት ያገኛል።"
        
          ,"<b>12.<b/> በከተማ አስተዳደሩ ክልል ውስጥ ያሉ አርሶ አደሮችን በተመለከተ፦",
          "ሀ. በከተማው የአስተዳደር ክልል ውስጥ ያሉ ከዚህ ቀደም ምንም ዓይነት የነዋሪነት አገልግሎት ከኦሮሚያ ክልላዊ መንግስት የአዲስ አበባ አዋሳኝ ቀበሌ ወይም ወረዳ ወይም በከተማ አስተዳደሩ አግኝተው የማያውቁ አርሶ አደሮች በነዋሪነት ለመመዝገብ ጥያቄ ሲያቀርቡ በሚኖሩበት ወረዳ ከኮሚሽኑ ጽህፈት ቤት አርሶ አደር መሆናቸውን እና የቤተሰብ ሁኔታቸውን የሚያረጋግጥ ማስረጃ በማቅረብ በዚህ መመሪያ አንቀጽ (2) የተቀመጠውን አሰራር በመከተል በነዋሪነት መመዝገብ ይችላሉ።",
          "ለ. ከላይ በ (ሀ) የተደነገገው እንደተጠበቀ ሆኖ ከዚህ ቀደም የነዋሪነት አገልግሎት ያላገኙ እና በአሰራሩ መሰረት የመልቀቂያ ማስረጃ ማቅረብ የማይችሉ ሆኖ ሲገኝ ከኮሚሽኑ ጽህፈት ቤት ይህንኑ የሚያረጋግጥ ማስረጃ በማቅረብ የይዞታ ማረጋገጫ ማስረጃ እንዲያቀርቡ በማድረግ ሌሎች የግል ወይም የቤተሰብ መረጃዎች በቃለ-መሃላ በማሟላት በነዋሪነት የሚመዘገቡ ይሆናል።"
        
          ,"<b>13.<b/> የከተማ አስተዳደሩ እና በከተማ አስተዳደሩ የሚገኙ የፌዴራል የመንግስት የኪራይ ቤቶች ተከራዮችን በተመለከተ፦",
          "ሀ. ተከራዮች ቀድሞ ከነበሩበት ቦታ በአሰራሩ መሰረት መልቀቂያ በማቅረብ በነዋሪነት ተመዝግበው ሁሉንም አገልግሎቶች ማግኘት ይችላሉ፤",
          "ለ. የመንግስትን ቤት ተከራይተው በነዋሪነት ከተመዘገቡ እና መታወቂያ ከወሰዱ በኋላ ቤቱን ሲለቁ የመታወቂያው የአገልግሎት ዘመን እስከሚያበቃ ድረስ ማንኛውንም አገልግሎቶች ማግኘት ይችላሉ፤",
          "ሐ. በመንግስት ኪራይ ቤቶች በተከፈተ ቅጽ ከተመዘገቡ በኋላ የመኖሪያ አድራሻቸው ከኢትዮጵያ ውጪ የሆነ ተገልጋዮች ከመታወቂያ አገልግሎት በስተቀር ማንኛውንም በቅጹ ላይ የተመዘገበ መረጃና ማስረጃ አገልግሎቶችን ማግኘት ይችላሉ፤",
          "መ. የመኖሪያ አድራሻ ለውጥ ካደረጉ በኋላ ቀደም ሲል የወሰዱት የመታወቂያ የአገልግሎት ዘመኑ ሲያበቃ ወደ ሚዛወሩበት አድራሻ የመልቀቂያ ደብዳቤ መውሰድ ይችላሉ፤",
          "ሠ. የአድራሻ ለውጡ ወደ ራሳቸው መደበኛ መኖሪያ ቤት ከሆነ የወሰዱት መታወቂያ የአገልግሎት ዘመኑ እስከሚያበቃ መጠበቅ ሳያስፈልግ ወዲያውኑ መልቀቂያ መውሰድ ይችላሉ፤"
        
          ,"<b>14.<b/> በመንግስት ወይም በግል የተገነቡ የጋራ መኖሪያ ቤቶች እና ሪል ስቴት ባለቤቶች ተመዝጋቢዎችን በተመለከተ፦",
          "ሀ. የመንግስት የጋራ መኖሪያ ቤት ሲሆን የቤት ዕድል የደረሳቸው ስለመሆኑ የሚያስረዳ ማስረጃ፣ ከሚመለከተው አካል ጋር ውል የፈጸሙበት እንዲሁም ክፍያ ያከናወኑበት ሰነድ በማቅረብ ሌሎች የዚህ መመሪያ የነዋሪነት ምዝገባ አሰራሮች እንደተጠበቁ ሆነው የነዋሪነት ቅጽ ከፍተው በነዋሪነት መመዝገብ እንዲሁም ማስመዝገብ ይችላሉ፤",
          "ለ. የጋራ መኖሪያ ቤቶች ወይም ሪል ስቴት ሲሆን የቤቱን ግዢ የፈጸሙበት የውል ማስረጃ እንዲሁም ክፍያ ያከናወኑበት ሰነድ በማቅረብ ሌሎች የዚህ መመሪያ የነዋሪነት ምዝገባ አሰራሮች እንደተጠበቁ ሆነው የነዋሪነት ቅጽ ከፍተው በነዋሪነት መመዝገብ እንዲሁም ማስመዝገብ ይችላሉ።",
          "<b>15.<b/> በከተማው ውስጥ ከመደበኛ የመኖሪያ ቦታው ውጭ በተለያየ ቦታ የግል መኖሪያ ቤት ያለው የቤት ባለ ንብረት በቤቱ ውስጥ በኪራይ ወይም በጥገኝነት የሚያኖራቸውን በነዋሪነት ማስመዝገብ ቢፈልግ፦",
  "   ሀ. የታደሰ መታወቂያ፤",
  "   ለ. የቤት የባለቤትነት ማረጋገጫ ካርታ እና ፕላን ፎቶ ኮፒ፤",
  "   ሐ. ከሚመለከተው ተቋም የተሰጠ የባለቤትነት ማስረጃ በማምጣት ተከራዮችን ወይም ተጠግተዉ የሚኖሩ ሰዎችን ማስመዝገብ ይችላል።",
  "<b>16.<b/>. በመንግስት በተመዘገቡ በአረጋውያን መንከባከቢያ፣ በህፃናት ማሳደጊያ ተቋማት፣ ካምፕ እና መጠለያዎች ውስጥ የሚገኙትን ነዋሪዎች ተቋማቱን ከሚመራው ኃላፊ ደብዳቤ ሲያቀርቡ ቃለ-መሃላ በመፈጸም እንደ መደበኛ መኖሪያ ተወስዶ ይመዘገባሉ፤",
  "<b>17.<b/> በካምፕ ውስጥ የሚኖሩ ሰዎች ከሚመለከተው ተቋም በሚፃፍላቸው ደብዳቤ እና የወረዳው አስተዳደር ካምፑ መኖሩን በሚያረጋግጠዉ ማስረጃ መሰረት መመዝገብ ይችላሉ፤",
  "<b>18.<b/>. በሐይማኖት እና በትምህርት ተቋማት ቅጥር ግቢ ዉስጥ በሚገኝ መኖርያ ቤት የሚኖሩ ተመዝጋቢዎች ከተቋሙ ኃላፊ /አስተዳዳሪ/ መደበኛ ነዋሪ መሆናቸውን የሚገልፅ ደብዳቤ ሲያቀርቡ እና የወረዳው አስተዳደር ተቋሙ መኖሩን በሚያረጋግጠዉ ማስረጃ መሰረት መመዝገብ ይችላሉ፤",
  "<b>19.<b/> በዚህ አንቀጽ ንዑስ አንቀፅ 17 መሰረት እንዲመዘገቡ ያደረገ ተቋም ተመዝጋቢዎች ከነዋሪነት ወይም ከመደበኛ ስራቸው ሲሰናበቱ ወይም ሲለቁ ተቋሙን የሚመራው ኃላፊ በ30 ቀናት ውስጥ ለወረዳው ጽ/ቤት በደብዳቤ ማሳወቅ አለበት፤",
  "<b>20.<b/> በዚህ አንቀጽ ንዑስ አንቀጽ 19 ላይ የተገለጸው እንደተጠበቀ ሆኖ ተመዝጋቢው የወሰደውን መታወቂያ የአገልግሎቱ ጊዜ አስከሚያበቃ ድረስ መጠቀም የሚችል ሲሆን በማንኛዉም ጊዜ የመልቀቂያ አገልግሎት ማግኘት ይችላል፤",
  "<b>21.<b/> በሰነድ አልባ ባለ ይዞታዎች የተያዘ ይዞታ መብት የሚፈጥርላቸው መሆኑ በሚመለከተው አካል ማለትም በወረዳው የመሬት ይዞታ አስተዳደር ጽ/ቤት ሲገለፅ እና የወረዳው ዋና ስራ አስፈጻሚ በወረዳው የሚኖሩ መሆናቸው ሲያረጋግጥ በነዋሪነት ይመዘገባሉ፤",
  "<b>22.<b/> የንግድ ቤት እና የመኖሪያ ቤት በአንድነት ያላቸው ተመዝጋቢዎች በነዋሪነት ለመመዝገብ የቤቱ ሁኔታ በመኖርያ ቤትነትም የተፈቀደ ስለመሆኑ ከቤቶች ልማት ጽ/ቤት ወይም ከግብር ከፋዮች ጽ/ቤት ማስረጃ ሲያቀርቡ በነዋሪነት ይመዘገባሉ።",
        ]
      },
      en: {
        title: "Residency Form 001 Registration",
        office: "🏛️ Woreda 08 Civil Registration and Residency Services Office",
        preConditions: [
          "1. Any Ethiopian citizen living within the city administration's jurisdiction and any Ethiopian by birth can register as a resident by appearing at the Woreda office near their regular place of residence and fulfilling the conditions prescribed in this directive.",
          "For children under 18 years of age, a father or mother or both, or a guardian or protector, or a legally authorized representative can register newborn infants as well as persons they administer in the household, acting as the owner of the house."
        ],
        requirements: [
         "<b>1. Requirements to be fulfilled by registrants:</b>",
    "a. If coming from another place of residence, a legal clearance letter from the previous location must be provided;",
    "b. An 'asmezgabi' (guarantor) who has a regular residence or is a registered resident in the area must be presented, and the clearance must be recorded and attached to the registrant's file;",
    "c. Individuals coming from outside Addis Ababa City Administration with a clearance letter must stay in the city for three months or more starting from the date of the request before permanent registration;",
    "d. Notwithstanding sub-article (c), registration may be permitted before the three-month period upon verification by the Woreda manager for reasons such as severe illness, education, government job transfer, or if one spouse is already a registered city resident;",
    "e. Notwithstanding sub-article (c), a letter valid for three months stating that the individual is awaiting permanent registration shall be issued from the date they notified the Woreda office.",

    "<b>2. Any registrant must provide the following information for registration:</b>",
    "a. Full name (including grandfather's name);",
    "b. Mother's full name;",
    "c. Gender;",
    "d. Date of birth (Day, Month, Year);",
    "e. Place of birth, specific location;",
    "f. Ethnicity;",
    "g. Nationality;",
    "h. Regular place of residence;",
    "i. Passport-sized photograph;",
    "j. Marital status;",
    "k. Blood type (optional);",
    "l. Religion;",
    "m. Educational level;",
    "n. Employment status;",
    "o. Phone number of both the registrant and the registered person.",

    "<b>3. If a registrant arrives due to a job transfer, they must provide a clearance letter issued within the last six months from their previous residence (Kebele/Woreda).</b>",
    "<b>1. The clearance must fulfill the following information:</b>",
    "a. Full name (including grandfather's name);",
    "b. Mother's full name;",
    "c. Marital status (if married, spouse's name, children's names, and other accompanying family members);",
    "d. Nationality;",
    "e. Date of birth (Day, Month, Year);",
    "f. Place of birth;",
    "g. Ethnicity;",
    "h. Religion;",
    "i. Educational status;",
    "j. Date and reference number;",
    "k. Photographs of family members over 18 taken within the last 6 months (attached to the clearance);",
    "l. Full name, title, and legal seal of the issuing authority or professional;",
    "m. Reason for transfer;",
    "n. Previous address (Region, Zone, Woreda, Kebele, and House Number);",
    "o. Notwithstanding Article 3 sub-article 1, any missing info (except a, b, c, j, k, m) must be verified through other legal documents or an oath.",

    "<b>4.</b> If a family member is missing from the registration form, the registrant can apply by providing institutional/educational evidence with a photo and performing an oath. For those under 18, the house owner performs the oath confirming residency.",
    "<b>5.</b> Notwithstanding Article 3(c), if a registrant cannot provide clearance due to force majeure (natural or man-made disasters) or disability, they can register after sub-city approval and performing an oath regarding their personal data.",
    "<b>6.</b> Applicants returning from abroad after more than two years without changing nationality must provide: a) Renewed passport or Laissez-passer; b) Evidence of permanent return from an Embassy/Mission or a duty-free customs permit.",
    "<b>7.</b> Honorably discharged members of the Defense or Police forces can use their discharge papers as clearance upon obtaining camp permission or an 'asmezgabi' resident.",
    "<b>8.</b> Registrants under articles 5 and 6 must surrender any previous ID card in their possession; if they never had one, they shall receive service upon performing an oath.",
    "<b>9.</b> Foreigners of Ethiopian origin can register and receive services (except a residency ID) by presenting an Ethiopian Origin ID card and performing an oath stating they aren't registered elsewhere in Ethiopia.",

    "<b>10. The following entities can facilitate registration:</b>",
    "a. Any person registered in the city with a permanent address;",
    "b. Police and Defense camps;",
    "c. Registered government and non-governmental organizations working on elderly care, street-homeless rehabilitation, and mental health support.",

    "<b>11.</b> Registrants (owners) can request in writing to block a resident in their file from services without waiting for ID expiry; approval is strictly the Woreda manager's responsibility. The blocked individual can use the ID until expiry unless suspected of illegal activity.",

    "<b>12. Regarding farmers within the city administration:</b>",
    "a. Farmers who never received residency services from Oromia or the city can register by providing evidence of their status and family conditions from the Commission office;",
    "b. If clearance cannot be provided, they must present land holding verification and complete personal/family data via oath.",

    "<b>13. Regarding tenants of City or Federal Government rental houses:</b>",
    "a. Tenants can register and get all services by providing clearance from their previous location;",
    "b. After vacating the government house, they can still receive services until the ID's expiry date;",
    "c. If living abroad after registration, they can get all service proofs except the ID card;",
    "d. Upon address change, they can take a clearance letter once the current ID expires;",
    "e. If moving to their own private home, they can take a clearance immediately without waiting for ID expiry.",

    "<b>14. Regarding Condominiums and Real Estate:</b>",
    "a. For government condominiums: Evidence of winning the house lottery, the contract, and payment documents are required;",
    "b. For real estate/private purchase: Purchase contract and payment documents are required to open a residency file.",

    "<b>15. Registration for owners with private houses for rental or dependency:</b>",
    "a. Renewed ID card;",
    "b. Photocopy of house ownership title deed (map) and plan;",
    "c. Ownership evidence issued by a relevant institution.",

    "<b>16.</b> Residents in registered elderly care, orphanages, and shelters register upon a letter from the head of the institution and an oath.",
    "<b>17.</b> Persons in camps register based on an institutional letter and Woreda verification of the camp's existence.",
    "<b>18.</b> Residents in religious or educational institutions register upon a letter from the administrator and Woreda verification.",
    "<b>19.</b> Institutions under Article 17 must notify the Woreda within 30 days if a registrant leaves their residency or regular work.",
    "<b>20.</b> Registrants from such institutions can use their ID until expiry and obtain clearance at any time.",
    "<b>21.</b> Occupants of undocumented holdings register when the Woreda Land Holding Office states the holding creates a right and the Chief Executive verifies residency.",
    "<b>22.</b> Registrants with combined business and residence register upon providing evidence that the house is permitted for residential use from the Housing Development or Taxpayers' Office."
        ]
      }
    
  },

    
    single_status: {
      am: { title: "ያላገባ ምስክር ወረቀት", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባ", 
        preConditions: ["ለ6 ወር ብቻ ያገለግላል።", "የፈቱ ከሆነ የፍቺ ውሳኔ መቅረብ አለበት።"], requirements: ["የታደሰ መታወቂያ", "ቃለ-መሃላ"], validity: "2 ዓመት" },
      en: { title: "Single Status Certificate", office: "🏛️ Woreda 08", preConditions: ["Valid for 6 months.", "Divorce decree if applicable."], requirements: ["Renewed ID", "Photos"], validity: "2 Years" }
    },
    residency: {
      am: { title: "የነዋሪነት ማረጋገጫ", office: "🏛️ ወረዳ 08 ነዋሪዎች አገልግሎት", preConditions: ["በወረዳው ነዋሪ ስለመሆናቸው የሚሰጥ የድጋፍ ደብዳቤ።", "በውክልና ሲሆን የውክልና ሰነድ ያስፈልጋል።"], requirements: ["የታደሰ መታወቂያ", "ቃለ-መሃላ"], validity: "2 ዓመት" },
      en: { title: "Residency Confirmation", office: "🏛️ Woreda 08", preConditions: ["Proof of residency.", "PoA for proxy requests."], requirements: ["Renewed ID"], validity: "2 Years" }
    },
    clearance: {
      am: { title: "የነዋሪነት መሸኛ", office: "🏛️ ወረዳ 08 ነዋሪዎች አገልግሎት", preConditions: ["ከወረዳው ወደ ሌላ ቦታ ለሚዛወሩ።", "መሸኛ በውክልና የሚቻለው በውክልና ሰነዱ ላይ ሲጠቀስ ነው።"], requirements: ["በአካል መቅረብ", "ፎቶግራፍ"], validity: "2 ዓመት" },
      en: { title: "Residency Clearance", office: "🏛️ Woreda 08", preConditions: ["For moving out.", "Proxy only if explicit in PoA."], requirements: ["Personal appearance"], validity: "2 Years" }
    },
    alive: {
      am: { title: "በህይወት ስለመኖር", office: "🏛️ ወረዳ 08 የሲቪል ምዝገባ", preConditions: ["ግለሰቡ በህይወት መኖሩን ለማረጋገጥ የሚሰጥ።", "በአካል መቅረብ ግዴታ ነው።"], requirements: ["ኦሪጅናል የታደሰ መታወቂያ"], validity: "2 ዓመት" },
      en: { title: "Proof of Life", office: "🏛️ Woreda 08", preConditions: ["Personal appearance mandatory."], requirements: ["Original ID"], validity: "2 Years" }
    }
  };

  const menuItems = [
    { key: "residency_registration", am: " የነዋሪነት ቅፅ 001 ላይ ምዝገባ", en: "Residency Form 001 Registration" },
    { key: "id_new", am: " መታወቂያ", en: "New ID" },
    { key: "birth", am: "የልደት ምዝገባ", en: "Birth" },
    { key: "single_status", am: "ያላገባ", en: "Single" },
    { key: "marriage", am: "የጋብቻ ምዝገባ", en: "Marriage" },
    { key: "death", am: "የሞት ምዝገባ", en: "Death" },
    { key: "divorce", am: "የፍቺ ምዝገባ", en: "Divorce" },
    { key: "residency", am: "ነዋሪነት", en: "Residency" },
    { key: "clearance", am: "መሸኛ", en: "Clearance" },
    { key: "alive", am: "በህይወት ስለመኖር", en: "Proof of Life" },
    { key: "adoption", am: "የጉዲፈቻ", en: "Adoption" },
    { key: "paternity_ack", am: "ልጅነትን መቀበል", en: "Paternity Ack" },
    { key: "paternity_court", am: "አባትነትን በፍርድ ቤት", en: "Judicial Paternity" },
    
  ];

  const current = services[activeTab][language];

  const uiLabels = {
    am: { header: "የወረዳ አገልግሎቶች መረጃ", select: "አገልግሎት ይምረጡ", preCond: "የአገልግሎት ቅድመ ሁኔታዎች", req: "ሚያስፈልጉ ደጋፊ ማስረጃዎች", notice: "ጠቃሚ ማሳሰቢያ" },
    en: { header: "Woreda Services Info", select: "Select Service", preCond: "Service Pre-conditions", req: "Required Documents", notice: "Important Notice" }
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1 className="header-title">🏛️ {uiLabels[language].header}</h1>
        <div className="lang-selector">
          {["am", "en"].map(l => (
            <button key={l} onClick={() => setLanguage(l)} className={`lang-btn ${language === l ? "active" : ""}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="main-layout">
        <div className="mobile-selector">
          <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)} className="service-select">
            {menuItems.map((item) => (
              <option key={item.key} value={item.key}>{language === "am" ? item.am : item.en}</option>
            ))}
          </select>
        </div>

        <div className="desktop-sidebar">
          {menuItems.map((item) => (
            <div key={item.key} onClick={() => setActiveTab(item.key)} className={`sidebar-item ${activeTab === item.key ? "active" : ""}`}>
              {language === "am" ? item.am : item.en}
            </div>
          ))}
        </div>

        <div className="info-area">
          <h2 className="info-title">📍 {current.title}</h2>
          <p className="office-name">{current.office}</p>

          <div className="section">
            <h4 className="section-header">✅ {uiLabels[language].preCond}</h4>
            {current.preConditions.map((item, i) => (
              <div key={i} className="list-item"><span className="check-icon">✔</span> {item}</div>
            ))}
          </div>

          <div className="section">
  <h4 className="section-header" style={{ borderColor: '#3b82f6' }}>
    📋 {uiLabels[language].req}
  </h4>
  <ul style={{ paddingLeft: '20px', color: '#475569', listStyleType: 'none' }}>
    {current.requirements.map((req, i) => (
      <li 
        key={i} 
        style={{ 
          marginBottom: '10px', 
          lineHeight: '1.6',
          display: 'flex',
          alignItems: 'flex-start'
        }}
      >
        {/* የዝርዝር ምልክት (Bullet point) እንዲኖር ካልፈለግህ ይሄን ማጥፋት ትችላለህ */}
        <span style={{ marginRight: '8px', color: '#3b82f6' }}>•</span>
        
        <span 
          style={{ flex: 1 }}
          // ይህ ኮድ ነው <b> የሚለውን ወደ ቦልድ የሚቀይረው
          dangerouslySetInnerHTML={{ __html: req }} 
        />
      </li>
    ))}
  </ul>
</div>

          <div className="notice-box">
            <h5 className="notice-header">⚠️ {uiLabels[language].notice}</h5>
            <ul className="notice-list">
              <li>{language === "am" ? `መታወቂያ በውክልና አይሰጥም አይታደስም ።` : `The residence ID will not be given by proxy and will not be renewed`}</li>
              <li>{language === "am" ? "በውጭ ሃገር የሚኖሩ ኢትዮጵያውያንና የውጭ ሃገር ዜጎች የነዋሪነት መታወቂያ አይሰጣቸውም " : "Ethiopians diasporas and foreign nationals living abroad are not issued residence ID"}</li>
              <li>{language === "am" ? ` በማንኛውም ንግድ ቤት የነዋሪዎች መታወቂያ አይሰጥም ፡፡` : ` Resident ID will not be issued at any business house`}</li>
              <li>{language === "am" ? `የነዋሪነት መታወቂያ የተሰጠው ማንኛውም ነዋሪ የነዋሪነት መታወቂያ እስከ አራት ዓመት የሚያገለግል ሆኖ የአግልግሎት ዘመን ሲያበቃ መታወቂያው ተመላሽ ሆኖ አዲስ መታወቂያ ይሰጣል ፡፡ ` : `Any resident who has been given a residence ID will be issued a new ID after the expiration of the period of service.`}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}