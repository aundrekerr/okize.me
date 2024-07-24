import React from 'react';
import '@/app/components/tooltip/tooltip.css'

interface TooltipProps {
  title?: string;
  subtitle?: string;
  desc?: string;
  data?: any;
}

export const OKZTooltip: React.FC<TooltipProps> = ({ title, subtitle, desc, data }) => {
  const frameLegend = () => {
    const frameStates = [
      {"c": "Counter"},
      {"pc": "Punish Counter"},
      {"ncar": "Non-Counter Action Recovery"},
      {"hap": "Hitbox Appearance Period"},
      {"pat": "Projectile Active Time"},
      {"pcat": "Parry/Counter Active Time"},
      // {"pdbrp": "Post-Damage/Block Recovery Time"},
      {"ip": "Invincibility Period"},
      {"sip": "Strike/Throw Invincibility Period"},
      {"pip": "Projectile Invincibility Period"},
      {"psip": "Strike/Projectile Invincibility Period"},
    ];
    
    return (
      <div className="frame-timeline-legend">
        <ul>
          {frameStates.map((f, i) => {
            const [key, value] = Object.entries(f)[0]
            return <li key={key} className={`frame frame-${key}`}><i /><span>{value}</span></li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <>
      <div className="glass"></div>
      <div className="okz-tooltip">
        <div className="header">
          <span className='tooltip-title'>{title}</span>
          <span className='tooltip-subtitle'>{subtitle}</span>
        </div>
        <div className="description"><p>{desc}</p></div>
        <div className="extra">
          { (title && title === "Frame Timeline") && frameLegend() }
        </div>
      </div>
    </>
  )
}