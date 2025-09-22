from django.core.management.base import BaseCommand
from startups.models import Startup
import random


class Command(BaseCommand):
    help = 'Seed the database with sample startup data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=50,
            help='Number of startups to create (default: 50)',
        )

    def handle(self, *args, **options):
        count = options['count']
        
        # Sample data
        startup_names = [
            "TechFlow", "DataVault", "CloudSync", "AI Insights", "BlockChain Pro",
            "CyberGuard", "DataStream", "CloudTech", "AI Solutions", "BlockChain Hub",
            "TechNova", "DataCore", "CloudBase", "AI Dynamics", "CryptoFlow",
            "TechEdge", "DataPulse", "CloudForce", "AI Vision", "BlockTech",
            "TechWave", "DataFlow", "CloudNet", "AI Core", "CryptoCore",
            "TechBoost", "DataVibe", "CloudRise", "AI Spark", "BlockRise",
            "TechFlow Pro", "DataSync", "CloudBoost", "AI Flow", "CryptoSync",
            "TechCore", "DataRise", "CloudEdge", "AI Boost", "BlockFlow",
            "TechPulse", "DataBoost", "CloudPulse", "AI Edge", "CryptoEdge",
            "TechRise", "DataEdge", "CloudCore", "AI Pulse", "BlockPulse"
        ]

        industries = [
            "Technology", "Healthcare", "Fintech", "E-commerce", "Education",
            "Transportation", "Energy", "Real Estate", "Entertainment", "Food & Beverage",
            "Manufacturing", "Retail", "Travel", "Sports", "Media",
            "Agriculture", "Construction", "Logistics", "Security", "Consulting"
        ]

        locations = [
            "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA",
            "Los Angeles, CA", "Chicago, IL", "Denver, CO", "Miami, FL", "Portland, OR",
            "San Diego, CA", "Atlanta, GA", "Dallas, TX", "Phoenix, AZ", "Philadelphia, PA",
            "Houston, TX", "Detroit, MI", "Minneapolis, MN", "Nashville, TN", "Orlando, FL",
            "London, UK", "Berlin, Germany", "Paris, France", "Amsterdam, Netherlands", "Dublin, Ireland",
            "Toronto, Canada", "Vancouver, Canada", "Sydney, Australia", "Melbourne, Australia", "Singapore"
        ]

        stages = ['idea', 'mvp', 'seed', 'series_a', 'series_b', 'series_c', 'growth', 'ipo']

        descriptions = [
            "Revolutionary AI-powered platform transforming the way businesses operate.",
            "Cutting-edge technology solution for modern enterprises.",
            "Innovative approach to solving complex industry challenges.",
            "Next-generation platform with advanced machine learning capabilities.",
            "Disruptive technology reshaping traditional business models.",
            "State-of-the-art solution combining AI and blockchain technology.",
            "Revolutionary platform leveraging cloud computing and data analytics.",
            "Innovative technology stack designed for scalability and performance.",
            "Advanced solution integrating multiple cutting-edge technologies.",
            "Next-level platform with real-time processing and analytics capabilities."
        ]

        tag_lists = [
            ["AI", "Machine Learning", "Data Analytics", "Cloud Computing"],
            ["Blockchain", "Cryptocurrency", "Fintech", "Security"],
            ["E-commerce", "Retail", "Mobile", "Web Development"],
            ["Healthcare", "MedTech", "Biotech", "Digital Health"],
            ["Education", "EdTech", "Online Learning", "Training"],
            ["Transportation", "Logistics", "Supply Chain", "Mobility"],
            ["Energy", "CleanTech", "Sustainability", "Renewable"],
            ["Real Estate", "PropTech", "Construction", "Property Management"],
            ["Entertainment", "Media", "Gaming", "Streaming"],
            ["Food", "AgriTech", "Farming", "Sustainability"]
        ]

        websites = [
            "https://techflow.com", "https://datavault.io", "https://cloudsync.net",
            "https://aiinsights.ai", "https://blockchainpro.com", "https://cyberguard.security",
            "https://datastream.io", "https://cloudtech.cloud", "https://aisolutions.ai",
            "https://blockchainhub.io", "https://technova.tech", "https://datacore.data",
            "https://cloudbase.cloud", "https://aidynamics.ai", "https://cryptoflow.crypto",
            "https://techedge.tech", "https://datapulse.data", "https://cloudforce.cloud",
            "https://aivision.ai", "https://blocktech.block", "https://techwave.tech",
            "https://dataflow.data", "https://cloudnet.cloud", "https://aicore.ai",
            "https://cryptocore.crypto", "https://techboost.tech", "https://datavibe.data",
            "https://cloudrise.cloud", "https://aispark.ai", "https://blockrise.block"
        ]

        self.stdout.write(f'Creating {count} startups...')

        for i in range(count):
            # Select random data
            name = random.choice(startup_names)
            industry = random.choice(industries)
            location = random.choice(locations)
            stage = random.choice(stages)
            description = random.choice(descriptions)
            tags = random.choice(tag_lists)
            website = random.choice(websites)

            # Create startup
            startup = Startup.objects.create(
                name=f"{name} {i+1}" if i > 0 else name,  # Ensure unique names
                website=website,
                location=location,
                industry=industry,
                stage=stage,
                description=description,
                tags=', '.join(tags)
            )

            if (i + 1) % 10 == 0:
                self.stdout.write(f'Created {i + 1} startups...')

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {count} startups!')
        )
