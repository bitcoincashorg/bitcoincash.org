import { useLocaleContext } from "i18n/provider"

const ACTIVATION_TIMESTAMP = 1605441600

const UpgradeDate = () => {
  const locale = useLocaleContext()
  const upgradeTimeStr = new Date(
    ACTIVATION_TIMESTAMP * 1000
  ).toLocaleDateString(locale.bcp47, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return upgradeTimeStr
}

export default UpgradeDate
