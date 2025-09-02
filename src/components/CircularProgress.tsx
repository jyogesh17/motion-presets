import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'gradient' | 'neon' | 'dashed' | 'wave' | 'pulse';
  color?: string | string[];
  backgroundColor?: string;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
  animation?: 'smooth' | 'spring' | 'bounce' | 'elastic';
  className?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  color = '#667eea',
  backgroundColor = '#e2e8f0',
  showValue = true,
  formatValue,
  animation = 'smooth',
  className = '',
  children
}) => {
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const motionValue = useMotionValue(0);
  const springConfig = {
    smooth: { stiffness: 100, damping: 30 },
    spring: { stiffness: 200, damping: 20 },
    bounce: { stiffness: 400, damping: 15 },
    elastic: { stiffness: 600, damping: 10 }
  };
  
  const springValue = useSpring(motionValue, springConfig[animation]);
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    motionValue.set(normalizedValue);
  }, [normalizedValue, motionValue]);

  const getGradientId = () => `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const gradientId = getGradientId();

  const renderVariant = () => {
    switch (variant) {
      case 'gradient':
        const colors = Array.isArray(color) ? color : [color, adjustColor(color, 30)];
        return (
          <>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                {colors.map((c, i) => (
                  <stop key={i} offset={`${(i * 100) / (colors.length - 1)}%`} stopColor={c} />
                ))}
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </>
        );

      case 'neon':
        return (
          <>
            <defs>
              <filter id="neon-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#333"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color as string}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              filter="url(#neon-glow)"
              style={{
                filter: `drop-shadow(0 0 ${strokeWidth}px ${color})`
              }}
            />
          </>
        );

      case 'dashed':
        return (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray="4 2"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color as string}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.05} ${circumference * 0.02}`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset,
                rotate: [0, 360]
              }}
              transition={{ 
                strokeDashoffset: { duration: 1, ease: 'easeInOut' },
                rotate: { duration: 10, repeat: Infinity, ease: 'linear' }
              }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
            />
          </>
        );

      case 'wave':
        return (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color as string}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset,
                strokeWidth: [strokeWidth, strokeWidth * 1.2, strokeWidth]
              }}
              transition={{ 
                strokeDashoffset: { duration: 1, ease: 'easeInOut' },
                strokeWidth: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </>
        );

      case 'pulse':
        return (
          <>
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color as string}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                strokeDashoffset: { duration: 1, ease: 'easeInOut' },
                scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
            />
          </>
        );

      default:
        return (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color as string}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size}>
        {renderVariant()}
      </svg>
      
      {(showValue || children) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (
            showValue && (
              <motion.span className="text-lg font-semibold">
                {formatValue 
                  ? formatValue(displayValue.get(), max)
                  : `${Math.round((displayValue.get() / max) * 100)}%`
                }
              </motion.span>
            )
          )}
        </div>
      )}
    </div>
  );
};

// Animated circular progress with segments
export const SegmentedProgress: React.FC<CircularProgressProps & {
  segments?: number;
  segmentGap?: number;
}> = ({
  segments = 12,
  segmentGap = 2,
  ...props
}) => {
  const { value, max = 100, size = 120, strokeWidth = 8, color = '#667eea' } = props;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const segmentLength = (circumference - segments * segmentGap) / segments;
  const filledSegments = Math.ceil((value / max) * segments);

  return (
    <div className={`relative inline-flex items-center justify-center ${props.className}`}>
      <svg width={size} height={size}>
        {Array.from({ length: segments }).map((_, index) => {
          const angle = (index * 360) / segments;
          const isFilled = index < filledSegments;
          
          return (
            <motion.path
              key={index}
              d={`
                M ${size / 2} ${strokeWidth / 2}
                A ${radius} ${radius} 0 0 1 
                ${size / 2 + radius * Math.sin((angle + 360 / segments) * Math.PI / 180)}
                ${size / 2 - radius * Math.cos((angle + 360 / segments) * Math.PI / 180)}
              `}
              stroke={isFilled ? color as string : '#e2e8f0'}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${segmentLength} ${circumference}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isFilled ? 1 : 0.3,
                scale: isFilled ? [1, 1.1, 1] : 1
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                scale: { duration: 0.3 }
              }}
              style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
            />
          );
        })}
      </svg>
      
      {props.showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">
            {Math.round((value / max) * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Helper function
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}